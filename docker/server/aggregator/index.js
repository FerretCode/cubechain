const { default: axios } = require("axios");
const { millie } = require("millie");

const app = new millie(3005).initialize();

app.server.on("request", (req, res) => {
  if (!req.url) return;

  try {
    req.method === "POST" ? post() : get();

    const endpoint = req.url.slice(req.url.lastIndexOf("/" + 1)).toUpperCase();

    function post() {
      axios
        .post(
          `${endpoint}_MICROSERVICE_SERVICE_HOST:${endpoint}_MICROSERVICE_SERVICE_PORT/api/${endpoint.toLowerCase()}`,
          {},
          { headers: { ...req.headers } }
        )
        .then((data) => res.respond(200, data.data))
        .catch((err) => {
          if (err.response) res.respond(err.response.status, err.response.data);
        });
    }

    function get() {
      axios
        .post(
          `${endpoint}_MICROSERVICE_SERVICE_HOST:${endpoint}_MICROSERVICE_SERVICE_PORT/api/${endpoint.toLowerCase()}`,
          {},
          {
            headers: { ...req.headers },
          }
        )
        .then((data) => res.respond(200, data.data))
        .catch((err) => {
          if (err.response)
            res.respond(err.response.status, err.response.status);
        });
    }
  } catch (error) {
    console.error(err);
  }
});
