const express = require("express");
const router = express.Router();
const { User } = require("../models");


router.post("/register", async (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;

    if (!email) {
        return res.status(422).json({
            errors: {
                email: "is required"
            }
        });
    }

    if (!password) {
        return res.status(422).json({
            errors: {
                password: "is required"
            }
        });
    }

    if (password !== passwordConfirm) {
        return res.status(422).json({
            errors: {
                password: "Password is not the same as confirmation password",
            }
        });
    }

    return await User.create({
        username, email, password
    })
        .then(User => res.status(200).send(User))
        .catch(error => res.status(400).send(error))

});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({
            errors: {
                email: "is required"
            }
        });
    }
    if (!password) {
        return res.status(422).json({
            errors: {
                password: "is required"
            }
        });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) res.json({ error: "User Doesn't Exist" });

    await User.validPassword(password, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username And Password Combination" });

        res.json("YOU LOGGED IN!!!");
    }).catch(error => res.status(400).send(error))

});

module.exports = router;