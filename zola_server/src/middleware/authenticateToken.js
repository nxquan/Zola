const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authorizationHeader = req.headers['authorization']
    const accessToken = authorizationHeader.split(' ')[1]

    if(!accessToken) return res.sendStatus(401) //UnAuthorization
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) return res.sendStatus(403)
        next()
    })
}

module.exports = authenticateToken