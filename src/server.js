require("dotenv").config();
const data = require("../data.json");
const fs = require("fs");
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
// - Configurando server
const express = require("express");
const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

function changeScene(sceneName) {
  return obs.send("SetCurrentScene", {
    "scene-name": sceneName,
  });
}

server.get("/", (req, res) => {
  return res.status(200).json(data);
});
server.post("/change-scene", (req, res) => {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.status(400).json({
        message: "Por favor, preencha todos os dados corretamente.",
      });
    }
  }
  let { sceneName } = req.body;
  changeScene(sceneName);
  return res.status(200).json({
    message: "A cena do obs foi trocada para" + sceneName,
  });
});
server.post("/create-scene", (req, res) => {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (!req.body[key]) {
      return res.status(400).json({
        message: "Por favor preencha todos os dados corretamente.",
      });
    }
  }

  let { sceneName } = req.body;
  const id = Number(data.dados.length + 1);
  data.dados.push({
    id,
    sceneName,
  });
  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(400).json({
        message: "Write file error.",
      });
    }
    return res.status(200).json({
      message: "A cena foi adicionada com sucesso no banco de dados.",
    });
  });
});
server.listen(8000, () => {
  return console.log("O server está on na porta 8000");
});
