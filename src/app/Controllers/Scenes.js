const db = require("../../config/db")
const obs = require("../../config/obs")
module.exports = {
    index(req,res){
        db.query(`SELECT * FROM scenes`, (err, results) => {
            if(err){ 
                return res.send("Database error.")
            }
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
                return res.send(
                    'Database Error.'
                )
            }

            return
        })
        return res.redirect("/")
    },
    edit(req,res){
       const query = `
        UPDATE scenes SET
            scenename=($1)
        WHERE id = $2
        `
        const values = [
            req.body.scenename,
            req.body.id
        ]
        db.query(query, values, (err, results) => {
            if(err){
                return res.send(`Database error.${err}`)
            }
            return res.redirect("/")

        })
    },
    show(req,res){
        const id = req.params.id
        db.query(`SELECT * FROM scenes WHERE id=$1`, [id], (err, results) => {
            if(err){
                return res.send("Database error.")
            }
            return res.render("show", {data: results.rows})
        })
    },
    changeScene(req,res) {
        console.log(req.body.scenename)
        obs.send("SetCurrentScene", {
          "scene-name": req.body.scenename,
        });
        return res.redirect("/")
    }
}
