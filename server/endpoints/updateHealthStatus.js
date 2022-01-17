const { createDefaultClient } = require("../../utils/createDefaultClient");

module.exports.updateHealthStatuses = (req, res, storage) => {
  let healthy = req.getHeader("healthy");
  let uid = req.getHeader("uid");

  createDefaultClient(storage, uid, {
    processCount: 0,
    healthy: healthy,
  });

  storage.clients[uid].healthy = healthy;

  //respond to request to let client know if request succeeded
  res.respond(200, {
    success: "client state was sucessfully updated",
  });
};
