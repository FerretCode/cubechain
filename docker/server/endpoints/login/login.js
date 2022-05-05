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
}).initialize();

app.request("/api/login", (req, res) => {
  let username = req.headers["username"];
  let password = req.headers["password"];
  let uid = req.headers["uid"];

  if (!username || !password || !uid)
    return res.respond(400, "Missing either password, uid, or username!");

  firestore
    .getDoc(`users/${req.headers["uid"]}`)
    .then((data) => {
      if (!data) res.respond(400, "Unique ID does not exist");

      if (bcrypt.compareSync(password, data.hash)) {
        let authKey = jwt.sign(
          {
            sub: req.headers["uid"],
            username,
            iat: day().unix(),
            exp: day().add("1", "day").unix(),
            jti: uuidv4(),
          },
          fs.readFileSync("./config/jwt/SIGNING_SECRET")
        );

        res.respond(200, {
          message: "User successfully logged in",
          uid: req.headers["uid"],
          authKey,
        });
      } else {
        res.respond(403, {
          message: "User authentication failed",
        });
      }
    })
    .catch((err) => {
      console.error(err);

      res.respond(500, "Internal server error");
    });
});
