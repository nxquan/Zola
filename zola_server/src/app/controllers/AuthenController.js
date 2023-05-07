const bcrypt = require('bcrypt')
const User = require('../model/User')
const RefreshToken = require('../model/RefreshToken')
const jwt = require('jsonwebtoken')

class AuthenController {
	// [POST] /api/auth/register [phone, username, password]
	async register(req, res, next) {
		let existingUser = await User.findOne({ phone: req.body.phone })
		if (existingUser)
			return res.json({
				msg: 'Số điện thoại đã được sử dụng',
				msgEnglish: 'The number phone is used!',
				statusCode: 200,
				result: false,
			})

		const salt = await bcrypt.genSaltSync(10)
		const hash = await bcrypt.hashSync(req.body.password, salt)

		const user = await User.create({ ...req.body, password: hash, friends: [req.body.phone] })
		if (user) {
			return res.json({
				msg: 'Đăng ký thành công',
				msgEnglish: 'Sign in successully!',
				statusCode: 200,
				result: true,
			})
		} else {
			return res.json({
				msg: 'Hệ thống xảy ra lỗi. Vui lòng đăng ký lại!',
				msgEnglish: 'Failure System. Please try again!',
				result: true,
			})
		}
	}

	// [POST] /api/auth/login [phone, password]
	async login(req, res, next) {
		let existingUser = await User.findOne({ phone: req.body.phone })
		if (!existingUser)
			return res.json({
				msg: 'Số điện thoại chưa đăng ký',
				msgEnglish: 'The phone number is not registered!',
				result: false,
			})
		let result =  bcrypt.compareSync(req.body.password, existingUser.password)

		if (result) {
			const accessToken = jwt.sign({phone: req.body.phone}, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: '15m'
			})

			const refreshToken = jwt.sign({phone: req.body.phone}, process.env.REFRESH_TOKEN_SECRET)
			await RefreshToken.create({token: refreshToken})

			res.cookie('access_token', accessToken, {
				maxAge: 1000*60*15,
				httpOnly: true,
			})

			return res.json({ result: true, refreshToken })
			
		} else
			return res.json({
				msg: 'Mật khẩu không chính xác',
				msgEnglish: 'The password is not exactly!',
				status: false,
			})
	}

	// [POST] /api/auth/refresh-token [phone, refreshToken]
	async refreshToken(req, res) {
		const refreshToken = req.body.refreshToken
		if(!refreshToken) return res.sendStatus(401)
		
		const result = await RefreshToken.findOne({token: refreshToken})
		if(!result) return res.sendStatus(403)

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
			if(err) return res.sendStatus(403)
			const accessToken = jwt.sign({phone: req.body.phone}, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: '15m'
			})

			res.cookie('access_token', accessToken, {
				maxAge: 1000*60*15,
				httpOnly: true,
			})

			return res.json({
				result: true
			})
		})
	}

	// [POST] /api/auth/log-out [refreshToken]
	async logOut(req, res) {
		const refreshToken = req.body.refreshToken

		if(!refreshToken) return res.sendStatus(401)

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, data) => {
			if(err) return res.sendStatus(403)
			await RefreshToken.deleteOne({token: refreshToken})

			return res.json({result: true})
		})
	}
}

module.exports = new AuthenController()
