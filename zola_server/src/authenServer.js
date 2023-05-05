const express = require('express')
const cors = require('cors')
const db = require('./config/db')
const dotenv = require('dotenv')
const authenRoutes = require('./routes/authen.route')
const authenticateToken = require('./middleware/authenticateToken')
dotenv.config()

const app = express()

const PORT = process.env.AUTHEN_PORT || 5500

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)
app.use(
	express.urlencoded({
		extended: true,
	})
)
app.use(express.json())
db.connect()

app.use('/api/auth', authenRoutes)
app.use('/books',authenticateToken, (req, res) => {
	return res.json({
		data: 'oke!'
	})
})

app.listen(PORT, () => {
	console.log(`Authen Server is listening on PORT ${PORT}`)
})
