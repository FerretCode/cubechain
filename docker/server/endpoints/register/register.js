const { millie } = require("millie");
const { MyCatLikesFirebaseServer } = require("my-cat-likes-firebase");
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
const day = require("dayjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = new millie(3005).initialize();
const firestore = new MyCatLikesFirebaseServer({
  firebaseCredentialsPath: "./config/firebase/FIREBASE_CONFIG",
  loggingEnabled: true,
}).initialize();

app.request("/api/register", (req, res) => {
  let uid = uuidv4();

  firestore
    .getDoc(`users/${uid}`)
    .then((data) => {
      if (data) res.respond(500, "Unique ID already exists");

      let username = req.headers["username"];
      let password = req.headers["password"];

      if (!username || !password)
        return res.respond(400, "Missing either password or username!");

      bcrypt.hash(password, 10).then((hash) => {
        firestore
          .createDoc(
            {
              balance: 0,
              username,
              hash,
              permissons: {
                admin: false,
                canMint: false,
              },
              registration: day().valueOf(),
              transactions: [],
            },
            `users/${uid}`
          )
          .then(() => {
            let authKey = jwt.sign(
              {
                sub: uid,
                username,
                iat: day().unix(),
                exp: day().add("1", "day").unix(),
                jti: uuidv4(),
              },
              fs.readFileSync("./config/jwt/SIGNING_SECRET")
            );

            res.respond(200, {
              message: "User was sucessfully registered.",
              uid,
              authKey,
            });
          })
          .catch((err) => {
            console.error(err);

            res.respond(500, "Internal server error");
          });
      });
    })
    .catch(() => {
      res.respond(500, "Internal server error");
    });
});
