require("dotenv").config();
const express = require("express")
const routes = express.Router()
routes.use(express.urlencoded({ extended: true }));
routes.use(express.json());
const db = require("./config/db")
const Scenes = require("./Controllers/Scenes")

routes.get("/", Scenes.index);
routes.post("/change-scene",Scenes.changeScene)
routes.post("/create-scene",Scenes.create)
routes.put("/edit-scene",Scenes.edit)
routes.delete("/delete-scene", Scenes.delete)

module.exports = routes
