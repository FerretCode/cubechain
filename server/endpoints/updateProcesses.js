const { createDefaultClient } = require("../../utils/createDefaultClient");

module.exports.updateProcess = (req, res, storage) => {
  let processCount = req.getHeader("processCount");
  let uid = req.getHeader("uid");

  createDefaultClient(storage, uid, {
    processCount: 0,
    healthy: true,
  });

  storage.clients[uid].processCount += processCount;

  //respond to request to let client know if request succeeded
  res.respond(200, {
    success: "client state was sucessfully updated",
  });
};
