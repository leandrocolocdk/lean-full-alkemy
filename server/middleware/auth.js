const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const { User, Operation } = require('../models');

// exports.login = async (req, res) => {
exports.auth = async (req, res, next) => {
    // Comprobar que existe el token
    if (!req.headers.authorization) {
        res.status(401).json({ msg: "Unauthorized access" });
    } else {

        // Comrpobar la validez de este token
        let token = req.headers.authorization.split(" ")[1];

        // Comprobar la validez de este token
        await jwt.verify(token, authConfig.JWT_SECRET, (err, decoded) => {

            if (err) {
                res.status(500).json({ msg: "There was a problem decoding the token", err });
            } else {

                User.findByPk(decoded.user.id).then(user => {
                    req.user = decoded.user;
                    next();
                });
            }

        })
    }

};

exports.verifyOwnerCreate = (req, res, next) => {

    // console.log("user >>>>>>>> > >> . .>", req.user.id)
    // console.log("user >>>>>>>> > >> . .>", req.body.userId)
    if (req.user.id === req.body.userId) {
        next();
    } else {
        res.status(401).json({ msg: "You are not authorized to see this application" });
    }
    next()
}

// exports.verifyOwnerRUD = (req, res, next) => {

//     // console.log("user >>>>>>>> > >> . .>", req.user.id)
//     // console.log("user >>>>>>>> > >> . .>", req.body.userId)
//     if (req.user.id === req.params.userId) {
//         next();
//     } else {
//         res.status(401).json({ msg: "You are not authorized to see this application" });
//     }
//     next()
// }