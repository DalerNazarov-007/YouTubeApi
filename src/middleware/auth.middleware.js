const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1]

    if (!token) {
        return res.status(401).send({ message: "Token missing!" });
    }

    try {
        const decodedToken = jwt.verify(token, "ndaler0717777")
        req.user = decodedToken
        next()
        
    } catch (error) {
        res.status(401)
        res.send({message: "Not authorized!"})
    }

}

module.exports = authMiddleware
