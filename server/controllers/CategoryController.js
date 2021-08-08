const { sequelize, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const { Category, User } = require("../models");

module.exports = {
    async create(req, res) {
        try {
            const { name } = req.body;
            const { userId } = req.user;

            let newCategory = await Category.create({ name, userId })

            if (newCategory) {
                res.json({
                    message: "Category created successfully",
                    data: newCategory
                })
            }

        } catch (error) {
            res.status(500).json({
                message:
                    "Something was wrong.",
            });
        }
    },

    async findAll(req, res) {
        try {
            const { userId } = req.user;

            let category = await Category.findAll({
                where: {
                    userId: userId
                }
            });

            if (!category) {
                res.json({ message: "The category was not found" });
            } else {
                res.json(category)
            }
        } catch (error) {
            res.status(500).json({
                message:
                    "Something was wrong.",
            });
        }
    },

    async findOne(req, res) {
        try {
            const { userId } = req.user;
            const category = await Category.findAll({
                where: {
                    [Op.and]: [
                        { id: req.params.id },
                        {
                            userId: userId
                        }
                    ]
                }
            })
            if (category.length > 0) {
                if (req.userId === category.userId) {
                    res.json(category);
                }
            } else {
                res.status(401).json({ message: "You are not authorized to view this category" });
            }
        } catch (error) {
            res.status(500).json({
                message:
                    "Something was wrong."
            });
        }
    },

    async update(req, res) {
        try {

            const categoryUpdate = {
                name: req.body.name,
            }
            const { userId } = req.user;

            let oldCategory = await Category.findByPk(req.params.id)
            if (!oldCategory) {
                res.status(404).json({ message: "The category was not found" });
            } else {
                if (userId === oldCategory.userId) {
                    await Category.update(categoryUpdate, { where: { id: req.params.id } })
                        .then(() => {
                            res.json({ message: "The category has been updated" });
                        }).catch(() => {
                            res.json({ message: "The category has not been updated" });
                        })
                } else {
                    res.status(401).json({ message: "You are not authorized to perform this action" });
                }
            }
        } catch {
            res.status(500).json({ message: "Something was wrong.", });
        }
    },

    async delete(req, res) {
        try {
            const { userId } = req.user

            let category = await Category.findByPk(req.params.id)
            if (!category) {
                res.status(404).json({ message: "The category was not found" });
            } else {
                if (userId === category.userId) {
                    await Category.destroy({ where: { id: req.params.id } })
                        .then(() => {
                            res.json({ message: "The category has been removed" });
                        }).catch(() => {
                            res.json({ message: "The category has not been deleted" });
                        })
                } else {
                    res.status(401).json({ message: "You are not authorized to perform this action" });
                }
            }
        } catch {
            res.status(500).json({ message: "Something was wrong.", });
        }
    },

}