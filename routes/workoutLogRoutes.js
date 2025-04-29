const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const isUserAllowedMiddleware = require("../middleware/isUserAllowedMiddleware");
const workoutLogController = require("../controllers/workoutLogController");

const router = express.Router();

router.use(authMiddleware);

router.post("/:userId/workout-logs", workoutLogController.createLog);
router.get("/:userId/workout-logs", isUserAllowedMiddleware, workoutLogController.getLogs);
router.get("/:userId/workout-logs/:logId", isUserAllowedMiddleware, workoutLogController.getLog);
router.put("/:userId/workout-logs/:logId", workoutLogController.updateLog);
router.delete("/:userId/workout-logs/:logId", workoutLogController.deleteLog);

module.exports = router;
