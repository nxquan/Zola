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

	async searchUsers(req, res, next) {
		const regex = new RegExp(req.query.value, 'i');
		//Find in username or phone
		const usersWithName = await User.find({ username: { $regex: regex } });
		const usersWithPhone = await User.find({ phone: { $regex: regex } });

		const tempUsers = [...usersWithName, ...usersWithPhone];
		const users = [];
		for (let i = 0; i < tempUsers.length; i++) {
			delete tempUsers[i].password;
		}
		//Delete the same user
		tempUsers.forEach((user) => {
			const check = users.some((otherUser) => user._id !== otherUser._id);
			if (!check) {
				users.push(user);
			}
		});

		return res.json({ users, status: true });
	}

	async updateInformationUser(req, res, next) {
		let updatedValues = req.body;
		await User.updateOne({ _id: req.body._id }, { ...req.body });

		return res.json({ msg: 'Updating successfully!', status: true });
	}

	async uploadAvatar(req, res, next) {
		if (req.file) {
			let url = process.env.HOST + req.file.path.substr(10);
			return res.json({
				msg: 'Uploading image is added successfully!',
				status: true,
				url: url,
			});
		} else {
			return res.json({
				status: false,
				msg: 'No file updated!!!',
			});
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
