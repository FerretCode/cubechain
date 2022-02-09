const { default: axios } = require("axios");
const { millie } = require("millie");

const app = new millie(3005).initialize();

app.server.on("request", (req, res) => {
  if (!req.url) return;

  try {
    if (req.method === "POST") {
      console.log(
        `${
          process.env[
            `${req.url
              .slice(req.url.lastIndexOf("/") + 1)
              .toUpperCase()}_MICROSERVICE_POD_SERVICE_HOST`
          ]
        }:${
          process.env[
            `${req.url
              .slice(req.url.lastIndexOf("/") + 1)
              .toUpperCase()}_MICROSERVICE_POD_SERVICE_PORT`
          ]
        }/api/${req.url.slice(req.url.lastIndexOf("/") + 1)}`
      );

      axios
        .post(
          `${
            process.env[
              `${req.url
                .slice(req.url.lastIndexOf("/") + 1)
                .toUpperCase()}_MICROSERVICE_POD_SERVICE_HOST`
            ]
          }:${
            process.env[
              `${req.url
                .slice(req.url.lastIndexOf("/") + 1)
                .toUpperCase()}_MICROSERVICE_POD_SERVICE_PORT`
            ]
          }/api/${req.url.slice(req.url.lastIndexOf("/") + 1)}`,
          {},
          {
            headers: {
              ...req.headers,
            },
          }
        )
        .then((data) => {
          console.log(data);

          res.respond(200, data.data);
        })
        .catch((err) => {
          console.error(err);

          res.respond(500, "Internal server error");
        });
    } else {
      axios
        .get(
          `${
            process.env[
              `${req.url
                .slice(req.url.lastIndexOf("/") + 1)
                .toUpperCase()}_MICROSERVICE_POD_SERVICE_HOST`
            ]
          }:${
            process.env[
              `${req.url
                .slice(req.url.lastIndexOf("/") + 1)
                .toUpperCase()}_MICROSERVICE_POD_SERVICE_PORT`
            ]
          }/api/${req.url.slice(req.url.lastIndexOf("/") + 1)}`,
          {
            headers: {
              ...req.headers,
            },
          }
        )
        .then((data) => {
          console.log(data);

          res.respond(200, data.data);
        })
        .catch((err) => {
          console.error(err);

          res.respond(500, "Internal server error");
        });
    }
  } catch (error) {
    console.error(err);
  }
});
