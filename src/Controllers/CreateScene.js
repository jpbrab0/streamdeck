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
            INSERT INTO scenes (
                scenename
            ) VALUES($1)
        `
        const values = [
            req.body.sceneName
        ]
        console.log(req.body.sceneName)
        console.log(db)
        db.query(query,values, (err, results) => {
            if(err){ return res.status(400) }
            console.log(results)
            return
        })
        
        return res.status(200).json({
            message:'This scene has been added to database'
        })

    }
}
