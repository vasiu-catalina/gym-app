const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/:userId", userController.getUser);
router.delete("/:userId", userController.deleteUser);
router.patch("/:userId", userController.updateUser);

module.exports = router;
