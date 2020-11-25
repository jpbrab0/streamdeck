const db = require("../../config/db")
const obs = require("../../config/obs")
module.exports = {
    index(req,res){
        db.query(`SELECT * FROM scenes`, (err, results) => {
            if(err){ 
                return res.send("Database error.")
            }
            console.log(results.rows)
            return res.render("index", { scenes: results.rows })
        })
    },
    create(req, res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == ''){
                return res.send("Please, fill all fields.")
            }
        }
        const query = `
            INSERT INTO scenes (
                scenename
            ) VALUES($1)
        `
        const values = [
            req.body.scenename
        ]
        db.query(query,values, (err, results) => {
            if(err){ return res.status(400) }
            console.log(results)
            return
        })

        return res.redirect("/")
    },
    delete(req,res){
        db.query(`DELETE FROM scenes WHERE id = $1`, [req.body.id], (err, results) => {
            if(err){
                return res.status(400).json({
                    message:'Database Error.'
                })
            }

            return
        })
        return res.status(200).json({
            message:'This scene has been deleted from database.'
        })
    },
    edit(req,res){
       const query = `
        UPDATE scenes SET
            scenename=($1)
        WHERE id = $2
        `
        const values = [
            req.body.sceneName,
            req.body.id
        ]
        db.query(query, values, (err, results) => {
            if(err){
                return res.status(400).json({
                    message:`Database error.${err}`
                })
            }
            return res.status(200).json({
                message:'This scene has been updated.'
            })

        })
    },
    changeScene(req,res) {
        obs.send("SetCurrentScene", {
          "scene-name": req.body.scenename,
        });
        console.log(req.body.scenename)
        return res.redirect("/")
    }
}
