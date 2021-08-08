const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {

    async signIn(req, res) {
        // Our login logic starts here
        try {
            // Get user input
            const { email, password } = req.body;

            // Validate user input
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }
            // Validate if user exist in our database
            const user = await User.findOne({ where: { email: email } });

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    { userId: user.id, email },
                    authConfig.JWT_SECRET,
                    { expiresIn: authConfig.EXPIRES }
                );

                // save user token
                user.token = token;

                // user
                res.status(200).json({ user, token });
            } else {
                res.status(400).json({ message: "Invalid Credentials" });
            }
        } catch (err) {
            res.status(500).json(err);
        }

    },

    async signUp(req, res) {
        try {
            const { username, email, password, passwordConfirm } = req.body;

            // Validate user input
            if (!(email && password && passwordConfirm)) {
                return res.status(400).send("All input is required");
            }
            // Validate password
            if (!(password && passwordConfirm)) {
                res.status(400).send("Password and Password Confirm not match");
            }

            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await User.findOne({ where: { email: email } });

            if (oldUser) {
                return res.status(409).send("User Already Exist. Please Login");
            }


            // Create user in our database
            const user = await User.create({ username, email, password })

            const token = jwt.sign(
                { user: user, email },
                authConfig.JWT_SECRET,
                {
                    expiresIn: authConfig.EXPIRES,
                }
            );
            // save user token
            user.token = token;

            // return new user
            res.status(201).json({ user: user, token: token });

        } catch (error) {
            res.status(500).json(error)
        }
    }
}