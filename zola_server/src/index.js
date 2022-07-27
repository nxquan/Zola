const express = require('express');
var morgan = require('morgan');
var cors = require('cors');
const db = require('./config/db');
const route = require('./routes');

const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');

const io = socket(server, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
});

require('dotenv').config();

app.use(cors());
app.use(morgan('combined'));

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());

db.connect();
app.get('/', (req, res) => {
	res.send('Server is running, here!!');
});
route(app);

global.onlineUsers = new Map();

io.on('connection', (client) => {
	global.chatClient = client;

	client.on('add-user', (userId) => {
		onlineUsers.set(userId, client.id);
	});

	client.on('send-msg', (data) => {
		const sendUser = onlineUsers.get(data.to);
		if (sendUser) {
			client.to(sendUser).emit('msg-receive', data.msg);
		}
	});
});

server.listen(process.env.PORT, () => {
	console.log(`Example app listening on port ${process.env.PORT}`);
});
