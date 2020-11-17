module.exports = {
    change(sceneName, obs) {
        return obs.send("SetCurrentScene", {
          "scene-name": sceneName,
        });
    }
}
