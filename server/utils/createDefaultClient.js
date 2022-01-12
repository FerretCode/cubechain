const { ClientStorage } = require("../classes/ClientStorage");

/**
 * A function to create new default clients
 * @param {ClientStorage} storage the ClientStorage to write to
 * @param {string} uid the unique ID of the client
 * @param {object} client the data of the client to write to storage
 */
module.exports.createDefaultClient = (storage, uid, client) => {
  //check if client is already present on server
  //if not create new default client
  if (!storage.clients[uid]) storage.newClient(uid, client);
};
