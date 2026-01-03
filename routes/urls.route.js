const express = require('express')
const {getUrl,createUrl} = require('../controllers/urls.controller')
const {validateUrl,validateRequest} = require('../middlewares/validate.middleware')
const asyncHandler = require('../middlewares/asyncHandler')
const UrlsRouter = express.Router()

UrlsRouter.post('/',validateUrl,asyncHandler(createUrl))
UrlsRouter.get('/:shortId', validateRequest,asyncHandler(getUrl))

module.exports = UrlsRouter