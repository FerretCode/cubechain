const { millie } = require("millie");
const { ClientStorage } = require("./ClientStorage");

/**
 * A class for recieving client container state
 * @class
 */
class ServerReciever {
  /**
   * @param {object} options an object for configuring the reciever
   * @param {number} options.port the port to host the reciever API on
   * @param {ClientStorage} options.storage the ClientStorage instance
   */
  constructor(options) {
    this.port = options.port;
    this.storage = options.storage;

    /**
     * A command to start listening for client state changes
     */
    this.listen = () => {
      const app = new millie(this.port);

      app.initialize();

      app.server.on("request", (req, res) => {
        try {
          let endpoint = require(`../endpoints/${req.url}`); //require module at request url
          let fn = endpoint[req.url.slice(req.url.lastIndexOf("/"))]; //get function from endpoint name

          fn(req, res, this.storage); //call function
        } catch {
          res.respond(200, "failure to reach endpoint"); //respond if error
        }
      });
    };
  }
}

module.exports = {
  ServerReciever,
};
