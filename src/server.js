const express = require("express");
const server = express();
const routes = require('./routes')
server.use(routes)

server.listen(8000, () => {
  return console.log("O server está on na porta 8000");
});
