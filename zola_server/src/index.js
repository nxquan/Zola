const express = require('express')
var cors = require('cors')
const db = require('./config/db')
const route = require('./routes')
const path = require('path')
const app = express()
const server = require('http').createServer(app)
const socket = require('socket.io')
require('dotenv').config()

const io = socket(server, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
})

const PORT = process.env.PORT || 5000
// Config for static files such as images,
app.use(express.static(path.join(__dirname, 'public')))

// Using cors to receive requests from clients (CORS Policy)
app.use(cors())

// Using middleware to recieve data from client by form-data or json
app.use(
	express.urlencoded({
		extended: true,
	})
)
app.use(express.json())

// Connect to db (mongodb)
db.connect()
// Default route
app.get('/', (req, res) => {
	res.send('Server is running, here!!')
})
// Routing for each request of client
route(app)

// Starting socket.io for communications
const onlineUsers = []

io.on('connection', (client) => {
	global.chatClient = client

	client.on('add-user', (userId) => {
		onlineUsers[userId] = client.id
	})

	client.on('send-msg', (data) => {
		const receivedUser = onlineUsers[data.to]
		if (receivedUser) {
			client.to(receivedUser).emit('receive-msg', data)
		}
	})

	client.on('send-interactive', (data) => {
		const receivedUser = onlineUsers[data.to]
		if (receivedUser) {
			client.to(receivedUser).emit('receive-interactive', {
				_id: data._id,
				interactive: data.interactive,
			})
		}
	})
})

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
