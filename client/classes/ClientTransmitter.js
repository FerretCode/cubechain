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
  }
}