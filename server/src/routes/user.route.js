const express = require('express');
const Router = express.Router();

const userController = require('../app/controllers/UserController');

Router.post('/register', userController.register);
Router.post('/login', userController.login);

Router.get('/', userController.index);

module.exports = Router;
