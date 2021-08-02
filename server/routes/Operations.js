const express = require("express");
const router = express.Router();
const { Operations } = require("../models");
const operationController = require("../controllers/operationController")


// router.get("/", operationController.getAll);
// router.post("/", operations.create);

// router.get("/:id", operations.findOne);

// router.put("/:id", operations.update);

// router.delete("/:id", operations.delete);

router.get("/", async (_, res) => {
    try {
        const operations = await Operations.findAll();
        return res.status(200).json({ operations });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const operations = await Operations.findByPk(id);
        return res.status(200).json({ operations });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const operation = req.body;
        const operations = await Operations.create(operation);
        return res.status(201).json(operations);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;