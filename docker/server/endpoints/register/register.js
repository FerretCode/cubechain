const { millie } = require("millie");
const { MyCatLikesFirebaseServer } = require("my-cat-likes-firebase");

const app = new millie(3005).initialize();

app.request("/api/register", (req, res) => {
  res.respond(200, "HI!!!!");
});
