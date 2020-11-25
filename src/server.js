const express = require("express");
const server = express();
const routes = require('./routes')
const nunjucks = require("nunjucks")
const cors = require("cors")
server.use(express.static("public"))

// Config da template engine.
server.set("view engine", "njk")
nunjucks.configure("src/app/views", {
    express:server,
    autoescape:false,
    noCache:true,
})
server.use(cors())
server.use(routes)
server.listen(8000, () => {
  return console.log("O server está on na porta 8000");
});
