const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 8000
const UrlsRouter = require('./routes/urls.route')
const app = express()
app.use(express.json())
app.use('/api/urls',UrlsRouter)
app.use((err,req,res,next) => {
    res.status(500).json({
        message : "Something went Wrong",
        error : err
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on Port no ${PORT}`)
})