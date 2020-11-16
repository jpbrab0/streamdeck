module.exports = {
    changeScene(sceneName, obs) {
        return obs.send("SetCurrentScene", {
          "scene-name": sceneName,
        });
    }
}