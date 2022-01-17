const { createDefaultClient } = require("../../utils/createDefaultClient");

module.exports.register = (req, res, storage) => {
  let uid = req.getHeader("uid");
  let processCount = req.getHeader("processes");
  let healthy = req.getHeader("healthy");

  createDefaultClient(storage, uid, {
    processCount,
    healthy,
  });

  //respond to request to let client know if request succeeded
  res.respond(200, {
    success: "client was successfully registered on server",
  });
};
