const { User } = require("../models");
const express = require("express");
const router = express.Router();



exports.register = async (req, res) => {
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

};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.json({ error: "User Doesn't Exist" });

    await User.validPassword(password, user.password)
        .then((match) => {
            if (!match) res.json({ error: "Wrong Username And Password Combination" });

            res.json("YOU LOGGED IN!!!");
        })
        .catch(error => res.status(400).send(error))

}

exports.delete = async (req, res) => {
    const { id } = req.body
    console.log(id)
    try {
        const deleteRowCount = await User.destroy({
            where: { id }
        })
        return res.json({
            message: "User deleted succesfully",
            conut: deleteRowCount
        })
    } catch {
        res.status(500).json({
            message:
                "Something was wrong.",
            data: {}
        });
    }
}