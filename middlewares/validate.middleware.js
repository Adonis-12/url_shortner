const pool = require('../db')
// validate get request
async function validateUrl(req,res,next){
    if(!req.body || !req.body.url){
        return res.status(400).json({
            message : "no url found"
        })
    }
    const url = req.body.url
    const exists = await pool.query(
        'SELECT long_url FROM urls WHERE long_url = $1',
        [url]
    )
    if(exists.rowCount){
       return  res.status(400).json({
            message : "url already exists"
        })
    }
    next()
}
// Validate post request
async function validateRequest(req,res,next){
    const shortId = req.params.shortId
    console.log(shortId)
    const result = await pool.query(
        'SELECT short_id FROM urls WHERE short_id = $1',
        [shortId]
    )
    if(!result.rowCount){
        return res.status(404).json({
            error : "url not found"
        })
    }
    console.log("hello1")
    return next()
}

module.exports = {
    validateRequest,
    validateUrl
}