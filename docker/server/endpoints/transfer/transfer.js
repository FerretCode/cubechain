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
  const token = req.headers["token"];
  const amount = req.headers["amount"];
  const uid = req.headers["recipient"];

  if (!token) return res.respond(400, "Missing auth token!");

  jwt.verify(
    token,
    fs.readFileSync("./config/jwt/SIGNING_SECRET"),
    async (err, decoded) => {
      if (err) return res.respond(403, "Invalid token!");

      const user = await firestore
        .getDoc(`users/${decoded.sub}`)
        .catch((err) => res.respond(500, "Internal server error!"));

      const recipient = await firestore.getDoc(`users/${uid}`).catch((err) => {
        console.error(err);
        return res.respond(500, "There was an error fetching the recipient!");
      });

      if (!recipient || !user)
        return res.respond(
          500,
          "There was an issue fetching either you or the recipient!"
        );

      if (user.balance < amount)
        return res.respond(
          403,
          "Your balance is not high enough to make this transaction!"
        );

      await firestore.updateDoc(
        {
          balance: recipient.balance + amount,
        },
        `users/${uid}`
      );
    }
  );
});
