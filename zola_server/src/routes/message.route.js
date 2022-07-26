const express = require('express');
const Router = express.Router();

const messageController = require('../app/controllers/MessageController');

Router.post('/add-message', messageController.addMessage);
Router.get('/get-all-messages', messageController.getAllMessages);

module.exports = Router;
