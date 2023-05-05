const userRoutes = require('./user.route')
const messageRoute = require('./message.route')

function router(app) {
	app.use('/api/user', userRoutes)
	app.use('/api/message', messageRoute)
}

module.exports = router
