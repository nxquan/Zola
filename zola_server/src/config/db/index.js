const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log('Connect successfully!');
	} catch (error) {
		console.log('Connect failed!');
	}
}

module.exports = { connect };
