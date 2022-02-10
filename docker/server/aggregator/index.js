const { default: axios } = require("axios");
const { millie } = require("millie");

const app = new millie(3005).initialize();

app.server.on("request", (req, res) => {
  if (!req.url) return;

  try {
    if (req.method === "POST") {
      console.log(req.url.slice(req.url.lastIndexOf("/") + 1).toUpperCase());

      console.log(
        `http://${
          process.env[
            `${req.url
              .slice(req.url.lastIndexOf("/") + 1)
              .toUpperCase()}_MICROSERVICE_SERVICE_HOST`
          ]
        }:${
          process.env[
            `${req.url
              .slice(req.url.lastIndexOf("/") + 1)
              .toUpperCase()}_MICROSERVICE_SERVICE_PORT`
          ]
        }/api/${req.url.slice(req.url.lastIndexOf("/") + 1)}`
      );

      axios
        .post(
          `http://${
            process.env[
              `${req.url
                .slice(req.url.lastIndexOf("/") + 1)
                .toUpperCase()}_MICROSERVICE_SERVICE_HOST`
            ]
          }:${
            process.env[
              `${req.url
                .slice(req.url.lastIndexOf("/") + 1)
                .toUpperCase()}_MICROSERVICE_SERVICE_PORT`
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
          res.respond(200, data.data);
        })
        .catch((err) => {
          if (err.response) res.respond(err.response.status, err.response.data);
        });
    } else {
      axios
        .get(
          `http://${
            process.env[
              `${req.url
                .slice(req.url.lastIndexOf("/") + 1)
                .toUpperCase()}_MICROSERVICE_SERVICE_HOST`
            ]
          }:${
            process.env[
              `${req.url
                .slice(req.url.lastIndexOf("/") + 1)
                .toUpperCase()}_MICROSERVICE_SERVICE_PORT`
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
          if (err.response) res.respond(err.response.status, err.response.data);
        });
    }
  } catch (error) {
    console.error(err);
  }
});
