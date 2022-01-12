/**
 * A class for storing client information and state
 * @class
 */
class ClientStorage {
  constructor() {
    this.clients = {};

    /**
     * A function to add a new client to the storage
     * @param {string} uid a unique ID for the client
     * @param {object} client client data
     * @param {number} client.processCount the number of current jobs running for the client
     * @param {boolean} client.healthy whether the client is healthy or not
     */
    this.newClient = (uid, client) => {
      this.clients[uid] = client;
    };

    /**
     * A function to remove clients from storage
     * @param {string} uid the unique ID of the client to dispose of from storage
     */
    this.disposeClient = (uid) => {
      delete this.clients[uid];
    };
  }
}

module.exports = {
  ClientStorage,
};
