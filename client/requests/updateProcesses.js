const axios = require("axios").default;

/**
 * A function for updating process counts on the server of a client container
 * @param {number} processCount the number of process to add to the server count
 * @param {string} uid the unique ID of the client container
 */
module.exports.run = (address, processCount, uid) => {
  axios.post(address, {
    processCount,
    uid,
  }).catch(err => {
    console.error("There was an error updating the job count!");
  });
};
