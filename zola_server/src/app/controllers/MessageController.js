const Message = require('../model/Message');

class MessageController {
	async addMessage(req, res, next) {
		try {
			const { from, to, message } = req.body;
			const curMsg = await Message.create({
				message: {
					typeOfMessage: 'text',
					text: message,
				},
				users: [from, to],
				sender: from,
			});
			if (curMsg) {
				return res.json({ msg: 'Message is added successfully!', status: true });
			}
			return res.json({ msg: 'Failed to add message to database!', status: false });
		} catch (error) {
			next(error);
		}
	}

	async getAllMessages(req, res, next) {
		try {
			const { from, to } = req.query;

			const plainMessages = await Message.find({
				users: { $all: [from, to] },
			}).sort({ updatedAt: 1 });

			const messages = plainMessages.map((msg) => {
				return {
					fromSelf: msg.sender.toString() === from,
					message: msg.message,
					sendedTime: msg.updatedAt,
				};
			});

			return res.json({ status: true, messages: messages });
		} catch (error) {
			next(error);
		}
	}

	async uploadImage(req, res, next) {
		let url = process.env.HOST + req.file.path.substr(10);
		try {
			const { from, to } = req.body;
			const curMsg = await Message.create({
				message: {
					typeOfMessage: 'file',
					file: {
						typeOfFile: 'image',
						url: url,
						filename: req.file.originalname,
						size: req.file.size,
					},
				},
				users: [from, to],
				sender: from,
			});
			if (curMsg) {
				return res.json({
					file: {
						typeOfFile: 'image',
						url: url,
						filename: req.file.originalname,
						size: req.file.size,
					},
					msg: 'Message is added successfully!',
					status: true,
				});
			}
			return res.json({ msg: 'Failed to add message to database!', status: false });
		} catch (error) {
			next(error);
		}
	}
	async uploadFile(req, res, next) {
		let url = process.env.HOST + req.file.path.substr(10);
		let typeOfFile = req.file.mimetype;
		try {
			const { from, to } = req.body;
			const curMsg = await Message.create({
				message: {
					typeOfMessage: 'file',
					file: {
						typeOfFile,
						url,
						filename: req.file.originalname,
						size: req.file.size,
					},
				},
				users: [from, to],
				sender: from,
			});
			if (curMsg) {
				return res.json({
					file: {
						typeOfFile,
						url,
						filename: req.file.originalname,
						size: req.file.size,
					},
					msg: 'Message is added successfully!',
					status: true,
				});
			}
			return res.json({ msg: 'Failed to add message to database!', status: false });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new MessageController();
