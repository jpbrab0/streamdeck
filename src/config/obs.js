// - Configurando OBSWebSocket
const OBSWebSocket = require("obs-websocket-js");
const obs = new OBSWebSocket();
obs.connect(
  {
    address: "localhost:4444",
    password: process.env.OBS_PASSWORD,
  },
  (err) => {
    console.error(err);
  }
);
module.exports = obs
