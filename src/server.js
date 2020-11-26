const express = require("express");
const server = express();
const routes = require('./routes')
const nunjucks = require("nunjucks")
const methodOverride = require("method-override")
const cors = require("cors")
server.use(express.static("public"))
server.use(methodOverride("_method"));
server.use(cors())

// Config da template engine.
server.set("view engine", "njk")
nunjucks.configure("src/app/views", {
    express:server,
    autoescape:false,
    noCache:true,
})
server.use(routes)
server.listen(8000, () => {
  return console.log("O server está on na porta 8000");
});
