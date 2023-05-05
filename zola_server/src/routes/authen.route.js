const express = require('express')
const Router = express.Router()

const auThenController = require('../app/controllers/AuthenController')

Router.post('/register', auThenController.register)
Router.post('/login', auThenController.login)
Router.post('/refresh-token', auThenController.refreshToken)
Router.post('/log-out', auThenController.logOut)

module.exports = Router
