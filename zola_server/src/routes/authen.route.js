const express = require('express');
const Router = express.Router();

const auThenController = require('../app/controllers/AuthenController');

Router.post('/register', auThenController.register);
Router.post('/login', auThenController.login);

module.exports = Router;
