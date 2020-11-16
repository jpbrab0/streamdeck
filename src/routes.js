require("dotenv").config();
const express = require("express")
const routes = express.Router()
routes.use(express.urlencoded({ extended: true }));
routes.use(express.json());
const utils = require("./utils")
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

routes.get("/", (req, res) => {
  return res.status(200).json({ message: 'Teste' });
});
routes.post("/change-scene", (req, res) => {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.status(400).json({
        message: "Por favor, preencha todos os dados corretamente.",
      });
    }
  }
  let { sceneName } = req.body;
  utils.changeScene(sceneName, obs);
  return res.status(200).json({
    message: "A cena do obs foi trocada para" + sceneName,
  });
});
routes.post("/create-scene", (req, res) => {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (!req.body[key]) {
      return res.status(400).json({
        message: "Por favor preencha todos os dados corretamente.",
      });
    }
  }

  return
});


module.exports = routes
