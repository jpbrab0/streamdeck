const db = require("../config/db")

module.exports = {
    create(req, res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key] == ''){
                return res.status(400).json({
                    message: 'Please fill all fields.'
                })
            }
        }
        const query = `
            INSERT INTO scenes {
                sceneName
            } VALUES($1)
            RETURNING id
        `
        const values = [
            req.body.sceneName
        ]
        db.query(query,values, (err, results) => {
            if(err) return res.status(400)
            return res.status(200).json(results)
        })
    }
    
}
