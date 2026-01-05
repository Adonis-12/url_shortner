const pool = require('../db')
const {nanoid} = require('nanoid')
// Getting url
async function getUrl(req,res){
    const shortId = req.params.shortId
    const result = await pool.query(
        'SELECT long_url from urls WHERE short_id = $1',
        [shortId]
    )
    console.log(result)
    res.redirect("https://www.facebook.com/")
}
// Creating short_id
async function createUrl(req,res){
    const long_url = req.body.url
    let short_id
    while(true){
        short_id = nanoid(7)
        let exists = await pool.query(
        'SELECT short_id FROM urls WHERE short_id = $1',
        [short_id]
    )
        if(!exists.rowCount){
            break
        }else{
            continue
        }
    }
    let result = await pool.query(
        'INSERT INTO urls(short_id,long_url) VALUES($1,$2)',
        [short_id,long_url]
    )
    return res.status(201).json({
        url : `${process.env.BASE_URL}/${short_id}`,
        data : result.rows[0]
    })
    
}
module.exports = {
    getUrl,
    createUrl
}