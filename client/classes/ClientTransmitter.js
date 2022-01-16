/**
 * A class for transmitting client state to the server container
 * @class
 */
class ClientTransmitter {
  /**
   * @param {string} address the IP or hostname of the server container to transmit to
   */
  constructor(address) {
    this.address = address;

    /**
     * A function for transmitting state to the server container
     * @param {string} req the name of the request to transmit to the server
     * @param {any[]} params any parameters to pass to the request function
     */
    this.transmitState = (req, params) => {
      try {
        let request = require(`../requests/${req}`);

        request.run(...params);
      } catch (err) {
        console.error(`Request ${req} failed to run!`);
      }
    };
  }
}

module.exports = {
  ClientTransmitter,
};
