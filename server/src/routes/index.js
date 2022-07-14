const userRoutes = require('./user.route');

function router(app) {
	app.use('/api/auth', userRoutes);
}

module.exports = router;
