const authenRoutes = require('./authen.route');
const userRoutes = require('./user.route');

function router(app) {
	app.use('/api/auth', authenRoutes);
	app.use('/api/user', userRoutes);
}

module.exports = router;
