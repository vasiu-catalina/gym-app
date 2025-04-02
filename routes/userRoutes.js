const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/:userId", userController.getUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;