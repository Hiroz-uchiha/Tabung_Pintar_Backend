const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.header("nama-token")

    if (!token) {
        return res.status(401).json({  
            status: res.statusCode,
            message: "Access Denied. Token not provided."
        })
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified
        next()
    } catch (err) {
        return res.status(400).json({
            status: res.statusCode,
            message: "Invalid Token"
        })
    }
}

module.exports = verifyToken
