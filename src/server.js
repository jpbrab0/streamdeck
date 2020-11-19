const express = require("express");
const server = express();
const routes = require('./routes')
const cors = require("cors")
server.use(routes)
server.use(cors())
server.listen(8000, () => {
  return console.log("O server está on na porta 8000");
});
