const { sequelize, DataTypes } = require('sequelize');
// const { Operation } = require("../database/db");
const { Operation, User } = require("../models");

// const express = require("express");

exports.create = async (req, res) => {
    try {
        const { concept, amount, date, type } = req.body;
        console.log(concept, amount, date, type)
        let NewOperation = await Operation.create({ concept, amount, date, type })

        if (NewOperation) {
            return res.json({
                message: "Operation created successfully",
                data: NewOperation
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:
                "Something was wrong.",
            data: {}
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const operations = await Operation.findAll({
            // include: [
            //     {
            //         model: User,
            //         as: 'UserId'
            //     }
            // ]
        });
        return res.status(200).json(operations);
    } catch (error) {
        return res.status(500).send(error.message);
    }

    // LIMIT 1

    // const { concept } = req.query || {};
    // console.log(category)
    // let condition = category ? { concept:{[Op.like]} }

    // await Operation.findAll({
    //     where: { UserId: id },
    // })
    //     .then(operations => {
    //         res.status(200).json(operations)
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Operation."
    //         });
    //     });
};

exports.getAllByUser = async (req, res) => {
    try {
        const operations = await Operation.findAll({
            where: { UserId: id },
        });
        return res.status(200).json({ operations });
    } catch (error) {
        return res.status(500).send(error.message);
    }

    // LIMIT 1

    // const { concept } = req.query || {};
    // console.log(category)
    // let condition = category ? { concept:{[Op.like]} }

    // await Operation.findAll({
    //     where: { UserId: id },
    // })
    //     .then(operations => {
    //         res.status(200).json(operations)
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Operation."
    //         });
    //     });
};
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await Operation.findOne({
        where: { UserId: id },
    })
        .then(operations => {
            res.status(200).json(operations)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Operation."
            });
        });
};

exports.findOneByUser = async (req, res) => {
    const id = req.params.id;
    await Operation.findOne({
        where: { UserId: id },
    })
        .then(operations => {
            res.status(200).json(operations)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Operation."
            });
        });
};
exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.getOperationsByUser = async (req, res) => {
    const { userId } = req.params.userId;
    console.log(userId)
    try {
        const operations = await Operation.findAll({ where: { userId } })

        if (operations) {
            return res.json({
                message: "Operations by User",
                data: operations
            })
        } else {
            return res.json({
                message: "There are no operations with that user",
                data: operations
            })
        }

    } catch (error) {
        res.status(500).json({
            message:
                "Something was wrong.",
            data: {}
        });
    }
};
// // DELETE /api/posts/:id
// router.delete('/:id', (req, res) => {
//     Post.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(result => {
//         res.json(result);
//     })
// });

// Recupere todos los tutoriales / busque por título de la base de datos:

// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

//   Tutorial.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };