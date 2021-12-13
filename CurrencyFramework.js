//dependencies
const { millie } = require("millie");

const ngrok = require("ngrok");
const dog = require("my-dog-likes-cheese");
const fs = require("fs");

/**
 * A class for creating a currency
 * @class CurrencyFramework
 */
class CurrencyFramework {
  /**
   * The constructor for the CurrencyFramework class
   * @param {object} options the options object for the currency
   * @param {string} options.name the name of the currency
   * @param {string} options.tag a four letter tag for the currency
   * @param {string?} options.token an optional auth token for making your currency private
   */
  constructor(options) {
    this.name = options.name;
    this.tag = options.tag;
    this.token = options.token;

    this.initializeCurrency = () => {
      const app = this.token ? new millie(3000, {
        auth_secret: this.token
      }) : new millie(3000);

      app.initialize();

      ngrok.connect().then(url => {
        console.log("ngrok tunnel opened");

        /**
         * Registers an account on the currency
         */
        app.request("/register", (req, res) => {
          let users = JSON.parse(fs.readFileSync("./storage/users.json"));

          //dog.JSONPushKey(__dirname + "/storage/users.json", "users")
        })
      })
    };
  }
}