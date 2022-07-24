const User = require('../model/User');

class UserController {
	async getInformationUser(req, res, next) {
		let user = await User.findOne({ phone: req.query.phone });

		if (user) {
			user = user.toObject();
			delete user.password;
			delete user.friends;
			return res.json({ infor: user, status: true });
		} else {
			return res.json({ msg: 'Người dùng không tồn tại', status: false });
		}
	}

	async getFriends(req, res, next) {
		try {
			const friends = [];
			let user = await User.findOne({ phone: req.query.phone });
			user = user.toObject();
			delete user.password;

			for (let i = 0; i < user.friends.length; i++) {
				let tempUser = await User.findOne({ phone: user.friends[i] });
				tempUser = tempUser.toObject();
				delete tempUser.password;
				delete tempUser.friends;

				friends.push(tempUser);
			}

			delete user.password;
			return res.json({ friends: friends, status: true });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new UserController();
