const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const accessToken =  req.cookies.access_token
    
    if(!accessToken) return res.sendStatus(401) //UnAuthorization
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) return res.sendStatus(403)
        next()
    })
}

module.exports = authenticateToken