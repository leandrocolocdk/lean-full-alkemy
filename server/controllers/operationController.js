const Operations = require("../models/Operations");
const Sequelize = require('sequelize');
const express = require("express");

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Operation
    const Operations = {
        title: req.body.title,
        description: req.body.description,
    };

    // Save Operation in the database
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Operation."
            });
        });
};

exports.getAll = async (req, res) => {
    try {
        const operations = await Operations.findAll();
        return res.status(200).json({ operations });
    } catch (error) {
        return res.status(500).send(error.menssage);
    }
};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};


