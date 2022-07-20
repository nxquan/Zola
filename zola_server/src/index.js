const express = require('express');
var morgan = require('morgan');
var cors = require('cors');
const db = require('./config/db');
const route = require('./routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());

db.connect();
route(app);

app.listen(5000, () => {
	console.log(`Example app listening on port ${process.env.PORT}`);
});
