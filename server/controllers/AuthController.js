const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {

    signIn(req, res) {

        let { email, password } = req.body;

        // Buscar usuario
        User.findOne({ where: { email: email } })
            .then(user => {

                if (!user) {
                    res.status(404).json({ msg: "User with this email not found" });
                } else {
                    if (User.validPassword(password, user.password)) {
                        // Creamos el token
                        let token = jwt.sign({ user: user },
                            authConfig.JWT_SECRET, {
                            expiresIn: authConfig.EXPIRES
                        });
                        res.json({
                            user: user, token: token
                        })
                    } else {
                        res.status(401).json({ msg: "Wrong Username And Password Combination" })
                    }
                }

            }).catch(err => {
                res.status(500).json(err);
            })

    },

    signUp(req, res) {
        const { username, email, password, passwordConfirm } = req.body;

        if (password !== passwordConfirm) {
            return res.status(422).json({
                errors: {
                    password: "Password is not the same as confirmation password",
                }
            });
        }

        User.create({ username, email, password })
            .then(user => {
                console.log(authConfig.JWT_SECRET)

                let token = jwt.sign(
                    { user: user }, authConfig.JWT_SECRET, {
                    expiresIn: authConfig.EXPIRES
                });

                res.json({ user: user, token: token });

            }).catch(err => {
                res.status(500).json(err);
            });
    },
}