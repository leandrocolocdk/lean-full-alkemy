const { sequelize, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { Operation, User } = require("../models");

module.exports = {
    async create(req, res) {
        try {
            const { concept, amount, date, type, category } = req.body;
            const { userId } = req.user;

            let newOperation = await Operation.create({ concept, amount, date, type, category, userId })

            if (newOperation) {
                res.json({
                    message: "Operation created successfully",
                    data: newOperation
                })
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:
                    "Something was wrong.",
            });
        }
    },

    async findAll(req, res) {
        try {
            //// ver esto
            let category, type;
            // category ? req.query.category : "";
            // type ? req.query.type : null
            const { userId } = req.user
            // console.log(userId, category, type)

            let operations = await Operation.findAll({
                where: {
                    userId: userId,
                    // type: req.query.type,
                    // category: req.query.category
                },
                order: [
                    ['id', 'DESC']
                ]
            });

            if (!operations) {
                res.json({ message: "The operation was not found" });
            } else {
                res.json(operations)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:
                    "Something was wrong.",
            });
        }
    },

    async findLastTen(req, res) {
        try {
            const { userId } = req.user

            let operations = await Operation.findAll({
                limit: 10,
                where: {
                    userId: userId
                },
                order: [
                    ['id', 'DESC']
                ]
            });

            if (!operations) {
                res.json({ message: "La operation no fue encontrado" });
            } else {
                res.json(operations)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:
                    "Something was wrong.",
            });
        }
    },

    async findOne(req, res) {
        try {
            // busco 1° si se encuentra el operation, ara verificar si es mio
            const operation = await Operation.findAll({
                attributes: ['id', 'concept', 'amount', 'date', 'type', 'category', 'userId'],
                where: {
                    [Op.and]: [
                        { id: req.params.id },
                        {
                            userId: req.user.userId
                        }
                    ]
                }
            })
            if (operation.length > 0) {
                if (req.userId === operation.userId) {
                    res.json(operation);
                }
            } else {
                res.status(401).json({ message: "You are not authorized to view this operation" });
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

            const operationUpdate = {
                concept: req.body.concept,
                amount: req.body.amount,
                date: req.body.date,
                category: req.body.category
            }
            const { userId } = req.user;
            //busco 1° si se encuentra el operation, ara verificar si es mio
            let oldOperation = await Operation.findByPk(req.params.id)
            if (!oldOperation) {
                res.status(404).json({ message: "The operation was not found" });
            } else {
                console.log(userId)
                if (userId === oldOperation.userId) {
                    await Operation.update(operationUpdate, { where: { id: req.params.id } })
                        .then(() => {
                            res.json({ message: "The operation has been updated" });
                        }).catch(() => {
                            res.json({ message: "The operation has not been updated" });
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
            //busco 1° si se encuentra el operation, ara verificar si es mio
            const { userId } = req.user
            let operation = await Operation.findByPk(req.params.id)
            if (!operation) {
                res.status(404).json({ message: "The operation was not found" });
            } else {
                if (userId === operation.userId) {
                    await Operation.destroy({ where: { id: req.params.id } })
                        .then(() => {
                            res.json({ message: "The operation has been removed" });
                        }).catch(() => {
                            res.json({ message: "The operation has not been deleted" });
                        })
                } else {
                    res.status(401).json({ message: "You are not authorized to perform this action" });
                }
            }
        } catch {
            res.status(500).json({ message: "Something was wrong.", });
        }
    },
    // const { QueryTypes } = require('sequelize');
    // const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
    /////////////////////////////////////// not founddddddddddd
    async egress(req, res) {
        try {
            const { userId } = req.user
            // let operations = await Operation.findAll(
            //     {
            //         where: {
            //             // userId: userId,
            //             // type: "egress",

            //             [Op.and]: [
            //                 {
            //                     userId: userId
            //                 },
            //                 //     { type: "egress" }
            //             ]
            //         },
            //     }
            // );
            const operations = await sequelize.query("SELECT `id`, `concept`, `amount`, `date`, `type`, `category`, `userId` FROM `Operations` AS `Operation` WHERE (`Operation`.`type` = 'egress' AND `Operation`.`userId` = userId", { type: QueryTypes.SELECT })


            if (!operations) {
                res.json({ message: "The operation was not found" });
            } else {
                res.json(operations)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:
                    "Something was wrong.",
            });
        }
    },
    async entry(req, res) {
        try {
            let operations = await Operation.findAll(
                {
                    where: {
                        userId: req.user.id,
                        type: "entry",
                    }
                },
            );

            if (!operations) {
                res.json({ message: "The operation was not found" });
            } else {
                res.json(operations)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:
                    "Something was wrong.",
            });
        }
    },

    async findAllEntry(req, res) {
        try {
            //// ver esto
            let category, type;
            // category ? req.query.category : "";
            // type ? req.query.type : null
            const { userId } = req.user
            console.log(userId, category, type)

            let operations = await Operation.findAll({
                where: {
                    userId: userId,
                    type: "entry",
                    // category: req.query.category
                },
                order: [
                    ['id', 'DESC']
                ]
            });

            if (!operations) {
                res.json({ message: "The operation was not found" });
            } else {
                res.json(operations)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:
                    "Something was wrong.",
            });
        }
    },
    async findAllEgress(req, res) {
        try {
            //// ver esto
            // let category, type;
            // category ? req.query.category : "";
            // type ? req.query.type : null
            const { userId } = req.user
            console.log(userId, category, type)

            let operations = await Operation.findAll({
                where: {
                    userId: userId,
                    type: "egress",
                    // category: req.query.category
                },
                order: [
                    ['id', 'DESC']
                ]
            });

            if (!operations) {
                res.json({ message: "The operation was not found" });
            } else {
                res.json(operations)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:
                    "Something was wrong.",
            });
        }
    },
}