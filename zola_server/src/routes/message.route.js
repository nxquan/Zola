const express = require('express');
const Router = express.Router();
const multer = require('multer');

const storageImage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/public/upload/image/');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
	},
});

const storageFile = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/public/upload/file/');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
	},
});

const imageFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
		return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
	}
};

const uploadImage = multer({ storage: storageImage, fileFilter: imageFilter });
const uploadFile = multer({ storage: storageFile });

const messageController = require('../app/controllers/MessageController');

Router.post('/add-message', messageController.addMessage);
Router.post('/add-interactive', messageController.addInteractive);
Router.get('/get-all-messages', messageController.getAllMessages);
Router.post('/upload-image', uploadImage.single('image'), messageController.uploadImage);
Router.post('/upload-file', uploadFile.single('file'), messageController.uploadFile);

module.exports = Router;
