const express = require("express");
const router = express.Router();
const { Operation } = require("../models");

const operationController = require("../controllers/OperationController")


router.get("/", operationController.getAll);
router.post("/", operationController.create);

router.get("/:id", operationController.findOne);

router.put("/:id", operationController.update);

router.delete("/:id", operationController.delete);

// Todas las operaciones del usuario === userId
router.get("/user/:userId", operationController.getOperationsByUser);


router.get("/user/:userId", operationController.getAllByUser);

router.get("/:UserId", operationController.findOne);

router.get("/user/:id", operationController.findOneByUser);

module.exports = router;