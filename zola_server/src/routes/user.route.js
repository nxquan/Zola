const express = require('express');
const Router = express.Router();
const userController = require('../app/controllers/UserController');
const multer = require('multer');

const storageImage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/public/upload/profile-image/');
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

Router.get('/get-friends', userController.getFriends);
Router.post('/update-information', userController.updateInformationUser);
Router.post(
	'/upload-profile-image',
	uploadImage.single('profile-image'),
	userController.uploadAvatar
);
Router.get('/searchUsers', userController.searchUsers);

Router.get('/:phone', userController.getInformationUser);

module.exports = Router;
