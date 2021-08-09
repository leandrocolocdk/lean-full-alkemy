const express = require("express");
const router = express.Router();
const { Operation } = require("../models");

const { verifyToken } = require("../middleware/auth")
const operationController = require("../controllers/OperationController")

router.use(verifyToken)

router.get("/", operationController.findAll);
router.get("/ten", operationController.findLastTen);

router.get("/:id", operationController.findOne);
router.post("/", operationController.create);

router.get("/findAllEgress/", operationController.findAllEgress);
//no anda entra en el find all
router.get("/findAllEntry", operationController.findAllEntry);

router.put("/:id", operationController.update);

router.delete("/:id", operationController.delete);


module.exports = router;