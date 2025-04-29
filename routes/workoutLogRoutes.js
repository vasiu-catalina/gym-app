const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const workoutLogController = require("../controllers/workoutLogController");

const router = express.Router();

router.use(authMiddleware);

router.post("/:userId/workout-logs", workoutLogController.createLog);
router.get("/:userId/workout-logs", workoutLogController.getLogs);
router.get("/:userId/workout-logs/:logId", workoutLogController.getLog);

module.exports = router;
