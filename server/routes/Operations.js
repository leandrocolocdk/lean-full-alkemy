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

router.get("/egress", operationController.egress);//cambiar el controlador
router.get("/entry", operationController.entry);

router.put("/:id", operationController.update);

router.delete("/:id", operationController.delete);


module.exports = router;