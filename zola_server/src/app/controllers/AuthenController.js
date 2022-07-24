const bcrypt = require('bcrypt');
const User = require('../model/User');

class AuthenController {
	async register(req, res, next) {
		const checkPhone = await User.findOne({ phone: req.body.phone });

		if (checkPhone) return res.json({ msg: 'Số điện thoại đã được sử dụng', status: false });
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, function (err, hash) {
				const user = new User({ ...req.body, password: hash });
				user.save()
					.then(() => {})
					.catch((error) => {
						handleError(error);
					});
				return res.json({ msg: 'Đăng ký thành công', status: true });
			});
		});
	}

	async login(req, res, next) {
		let checkUser = await User.findOne({ phone: req.body.phone });
		if (!checkUser) return res.json({ msg: 'Số điện thoại chưa đăng ký', status: false });

		let result = bcrypt.compare(req.body.password, checkUser.password);

		if (result) return res.json({ status: true });
		else return res.json({ msg: 'Mật khẩu không chính xác', status: false });
	}
}

module.exports = new AuthenController();
