module.exports = {
    index(sceneName, obs) {
        return obs.send("SetCurrentScene", {
          "scene-name": sceneName,
        });
    }
}