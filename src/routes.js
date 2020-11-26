require("dotenv").config();
const express = require("express")
const routes = express.Router()
routes.use(express.urlencoded({ extended: true }));
routes.use(express.json());
const Scenes = require("./app/Controllers/Scenes")

routes.get("/", Scenes.index);
routes.get("/create", (req, res) => {
    return res.render("createScene")
})
routes.get("/scene/:id", Scenes.show)
routes.post("/change-scene",Scenes.changeScene)
routes.post("/create-scene",Scenes.create)
routes.put("/edit-scene",Scenes.edit)
routes.delete("/delete-scene", Scenes.delete)

module.exports = routes
