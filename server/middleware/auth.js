const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const { User, Operation } = require('../models');


exports.verifyToken = (req, res, next) => {
    // let token = req.headers.authorization.split(" ")[1];
    let token = null;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
        // split me arma un arreglo con el separador , y quiero el segundo elemento
    }
    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, authConfig.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    return next();
};


