const Message = require('../model/Message');

class MessageController {
	async addMessage(req, res, next) {
		try {
			const { from, to, message } = req.body;
			const curMsg = await Message.create({
				message: {
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
					message: msg.message.text,
					sendedTime: msg.updatedAt,
				};
			});

			return res.json({ status: true, messages: messages });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new MessageController();
