const authenRoutes = require('./authen.route');
const userRoutes = require('./user.route');
const messageRoute = require('./message.route');

function router(app) {
	app.use('/api/auth', authenRoutes);
	app.use('/api/user', userRoutes);
	app.use('/api/message', messageRoute);
}

module.exports = router;
