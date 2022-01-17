const axios = require("axios").default;

/**
 * A function for updating process counts on the server of a client container
 * @param {number} health the new health of the client container
 * @param {string} uid the unique ID of the client container
 */
module.exports.run = (address, healthy, uid) => {
  axios
    .post(address, {
      healthy,
      uid,
    })
    .catch((err) => {
      console.error("There was an error updating the health status!");
    });
};
