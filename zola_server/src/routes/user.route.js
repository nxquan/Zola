const express = require('express');
const Router = express.Router();
const userController = require('../app/controllers/UserController');

Router.get('/get-friends', userController.getFriends);
Router.get('/:phone', userController.getInformationUser);

module.exports = Router;
