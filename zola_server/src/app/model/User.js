const mongoose = require('mongoose');

const User = new mongoose.Schema(
	{
		username: { default: 'Username', type: String },
		phone: { type: String, unique: true },
		password: { type: String },
		profilePicture: { default: '', type: String },
		coverPicture: { default: '', type: String },
		gender: { default: 0, type: Boolean },
		birthday: {
			day: { default: 1, type: Number },
			month: { default: 1, type: Number },
			year: { default: new Date().getFullYear() - 16, type: Number },
		},
		friends: { default: [], type: Array },
		isAdmin: { default: false, type: Boolean },
		isOnline: { default: false, type: Boolean },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', User);
