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

// Parsers for form-data, json
app.use(
	express.urlencoded({
		extended: true,
	})
)

app.use(express.json())

// Connect to database
db.connect()

// Set routes. (I don't split individual file b/c this auth server
// consists of 4 route. That is small amount.)
app.use('/api/auth', authenRoutes)
app.listen(PORT, () => {
	console.log(`Authen Server is listening on PORT ${PORT}`)
})
