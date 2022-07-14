const User = require('../model/User');

class UserController {
	index(req, res, next) {
		req.send('Hello world');
	}

	async register(req, res, next) {
		const checkPhone = await User.findOne({ phone: req.body.phone });
		if (checkPhone) return res.json({ msg: 'Số điện thoại đã được sử dụng', status: false });
		const user = new User(req.body);
		user.save()
			.then(() => {})
			.catch((error) => {
				handleError(error);
			});
		return res.json({ msg: 'Đăng ký thành công', status: true });
	}

	async login(req, res, next) {
		console.log(req.body);
		let checkUser = await User.findOne({ phone: req.body.phone });
		if (!checkUser) return res.json({ msg: 'Số điện thoại chưa đăng ký', status: false });

		checkUser = checkUser.toObject();
		console.log(req.body.password, '---', checkUser.password);

		if (req.body.password === checkUser.password) return res.json({ status: true });
		else return res.json({ msg: 'Mật khẩu không chính xác', status: false });
	}
}

module.exports = new UserController();
