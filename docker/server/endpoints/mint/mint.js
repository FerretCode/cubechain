const { millie } = require("millie");
const { MyCatLikesFirebaseServer } = require("my-cat-likes-firebase");
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
const day = require("dayjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = new millie(3005);
app.initialize();
const firestore = new MyCatLikesFirebaseServer({
  firebaseCredentialsPath: "./config/firebase/FIREBASE_CONFIG",
  loggingEnabled: true,
});

firestore.initialize();

app.request("/api/login", (req, res) => {
  let token = req.headers["token"];
  let amount = req.headers["amount"];

  if (!token) return res.respond(400, "Missing auth token!");

  jwt.verify(
    token,
    fs.readFileSync("./config/jwt/SIGNING_SECRET"),
    async (err, decoded) => {
      if (err) return res.respond(403, "Invalid token!");

      const genesis = await firestore
        .getDoc("mint_records/genesis")
        .catch((err) => res.respond(500, "Internal server error!"));

      await firestore
        .createOrUpdateDoc(
          {
            balance: (genesis.balance || 0) + balance,
            writer: {
              uid: decoded.sub,
              username: decoded.username,
            },
          },
          "mint_records/genesis"
        )
        .catch((err) => {
          console.error(err);

          return res.respond(500, "Internal server error!");
        });

      res.respond(200, "Minted successfully!");
    }
  );
});
