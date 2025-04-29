const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const isUserAllowedMiddleware = require("../middleware/isUserAllowedMiddleware");
const userController = require("../controllers/userController");

const router = express.Router();

router.use(authMiddleware);

router.get("/:userId",  isUserAllowedMiddleware, userController.getUser);
router.delete("/:userId", userController.deleteUser);
router.patch("/:userId", userController.updateUser);
router.put("/:userId/change-password", userController.changePassword);

module.exports = router;
