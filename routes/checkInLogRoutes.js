const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const checkInLogController = require("../controllers/checkInLogController");

const router = express.Router();

router.use(authMiddleware);

router.post("/:userId/check-in-logs", checkInLogController.createLog);
router.get("/:userId/check-in-logs", checkInLogController.getAll);

module.exports = router;
