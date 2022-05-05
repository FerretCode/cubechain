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
  let token = req.headers["token"];
  let amount = req.headers["amount"];

  if (!token) return res.respond(400, "Missing auth token!");

  jwt.verify(
    token,
    fs.readFileSync("./config/jwt/SIGNING_SECRET"),
    (err, decoded) => {
      if (err) return res.respond(403, "Invalid token!");
    }
  );
});
