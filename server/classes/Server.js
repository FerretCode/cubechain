const { ServerReciever } = require("./ServerReciever");
const { ClientStorage } = require("./ClientStorage");
const { StandaloneServer } = require("./StandaloneServer");

const { millie } = require("millie");

const fs = require("fs");
const ngrok = require("ngrok");

/**
 * A base class for server containers
 * @class
 */
class Server {
  /**
   * @param {string} config the path to the config file for the server
   * @constructor
   */
  constructor(config) {
    this.config = config;

    this.initialize = () => {
      let json = JSON.parse(fs.readFileSync(this.config));

      this.tag = json.tag || "MONEY"; //get currency tag from config or default to MONEY
      this.name = json.name || "Money"; // get currency name from config or default to Money

      if (json.standalone === true) new StandaloneServer(); //placeholder

      this.storage = new ClientStorage();
      this.reciever = new ServerReciever({
        port: json.port || 3000,
        storage: this.storage,
      });

      this.reciever.listen();

      console.log("client storage and listener running");

      ngrok
        .connect({
          authtoken: json.authToken || undefined,
          addr: this.json.port || 3000,
        })
        .then((url) => {
          console.log(`ngrok tunnel opened at ${url} for client listener`);
        });
    };
  }
}
