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

app.request("/api/login", (req, res) => {
  firestore
    .getDoc(`users/${req.headers["uid"]}`)
    .then((data) => {
      if (!data) res.respond(500, "Unique ID does not exist");

      let username = req.headers["username"];
      let password = req.headers["password"];

      if (!username || !password)
        return res.respond(400, "Missing either password or username!");

      if (bcrypt.compareSync(password, data.hash)) {
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
          message: "User successfully logged in",
          uid,
          authKey,
        });
      } else {
        res.respond(403, {
          message: "User authentication failed",
        });
      }
    })
    .catch(() => {
      res.respond(500, "Internal server error");
    });
});
