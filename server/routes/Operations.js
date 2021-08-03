const express = require("express");
const router = express.Router();
const { Operation } = require("../models");

const { auth, verifyOwnerCreate } = require("../middleware/auth")
const { verifyOwnerRUD } = require("../middleware/auth")
const operationController = require("../controllers/OperationController")

router.use(auth)
router.get("/", operationController.getAll);
router.post("/", verifyOwnerCreate, operationController.create);

router.get("/:id", operationController.findOne);

router.put("/:id", operationController.update);

router.delete("/:id", operationController.delete);

// Todas las operaciones del usuario === userId
// router.get("/user/:userId", operationController.getOperationsByUser);


// router.get("/user/:userId", operationController.getAllByUser);

// router.get("/:UserId", operationController.findOne);

// router.get("/user/:id", operationController.findOneByUser);

module.exports = router;