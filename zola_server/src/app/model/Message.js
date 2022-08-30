const mongoose = require('mongoose');

const Message = new mongoose.Schema(
	{
		message: {
			typeOfMessage: {
				type: String,
				default: 'text',
			},
			text: {
				type: String,
			},
			file: {
				typeOfFile: {
					type: String,
				},
				url: {
					type: String,
				},
				filename: {
					type: String,
				},
				size: {
					type: Number,
				},
			},
		},
		users: Array,
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		interactive: { type: String, default: 'none' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Message', Message);
