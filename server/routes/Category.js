const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth")
const categoryController = require("../controllers/categoryController")

router.use(verifyToken)

router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findOne);
router.post("/", categoryController.create);

router.put("/:id", categoryController.update);

router.delete("/:id", categoryController.delete);

















// Todas las operaciones del usuario === userId
// router.get("/user/:userId", operationController.getOperationsByUser);


// router.get("/user/:userId", operationController.getAllByUser);

// router.get("/:UserId", operationController.findOne);

// router.get("/user/:id", operationController.findOneByUser);

module.exports = router;