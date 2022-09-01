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
				return res.json({
					_id: curMsg._id,
					msg: 'Message is added successfully!',
					status: true,
				});
			}
			return res.json({ msg: 'Failed to add message to database!', status: false });
		} catch (error) {
			next(error);
		}
	}
	async addInteractive(req, res, next) {
		try {
			const message = await Message.findOne({ _id: req.body._id });
			let curInteractive;
			if (message.interactive === req.body.interactive) {
				curInteractive = 'none';
			} else {
				curInteractive = req.body.interactive;
			}
			await Message.findOneAndUpdate(
				{ _id: req.body._id },
				{
					interactive: curInteractive,
				}
			);

			return res.json({ status: true, msg: 'Add interactive successfully!' });
		} catch (error) {
			next(error);
		}
	}
	async getAllMessages(req, res, next) {
		try {
			const { from, to } = req.query;

			const plainMessagesFromDB = await Message.find({
				users: { $all: [from, to] },
			}).sort({ createdAt: 1 });
			const plainMessages = plainMessagesFromDB.filter((message) => {
				return (
					(message.users[0] === from && message.users[1] === to) ||
					(message.users[0] === to && message.users[1] === from)
				);
			});
			const messages = plainMessages.map((msg) => {
				return {
					fromSelf: msg.sender.toString() === from,
					message: msg.message,
					sendedTime: msg.updatedAt,
					interactive: msg.interactive,
					_id: msg._id,
				};
			});

			return res.json({ status: true, messages: messages });
		} catch (error) {
			next(error);
		}
	}
	async getLatestMessage(req, res, next) {
		try {
			const { from, to } = req.query;

			const plainMessageFromDB = await Message.findOne({
				users: { $all: [from, to] },
			}).sort({ createdAt: -1 });

			const message = {
				fromSelf: plainMessageFromDB.sender.toString() === from,
				message: plainMessageFromDB.message,
				sendedTime: plainMessageFromDB.updatedAt,
				interactive: plainMessageFromDB.interactive,
				_id: plainMessageFromDB._id,
			};

			return res.json({ status: true, message: message });
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
