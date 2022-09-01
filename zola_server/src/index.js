const express = require('express');
var morgan = require('morgan');
var cors = require('cors');
const db = require('./config/db');
const route = require('./routes');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
require('dotenv').config();

const io = socket(server, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
});

app.use(express.static(path.join(__dirname, 'public')));
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
const onlineUsers = [];

io.on('connection', (client) => {
	global.chatClient = client;

	client.on('add-user', (userId) => {
		onlineUsers[userId] = client.id;
	});

	client.on('send-msg', (data) => {
		const receivedUser = onlineUsers[data.to];
		if (receivedUser) {
			client.to(receivedUser).emit('receive-msg', data);
		}
	});

	client.on('send-interactive', (data) => {
		const receivedUser = onlineUsers[data.to];
		if (receivedUser) {
			client.to(receivedUser).emit('receive-interactive', {
				_id: data._id,
				interactive: data.interactive,
			});
		}
	});
});

server.listen(process.env.PORT, () => {
	console.log(`Example app listening on port ${process.env.PORT}`);
});
