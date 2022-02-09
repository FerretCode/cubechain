const { default: axios } = require("axios");
const { millie } = require("millie");

const app = new millie(3005).initialize();

app.server.on("request", (req, res) => {
  if(!req.url) return;

  try {
    if(req.method === 'POST') {
      axios.post(`${req.url.slice(req.url.lastIndexOf("/")).toUpperCase()}_MICROSERVICE_POD`, {
        req
      }).catch(err => console.error(err));
    } else {
      axios.get(`${req.url.slice(req.url.lastIndexOf("/")).toUpperCase()}_MICROSERVICE_POD`, {
        headers: {
          ...req.headers
        }
      }).catch(err => console.error(err));
    }
  } catch(error) {
    console.error(err);
  }
});