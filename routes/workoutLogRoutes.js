const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const workoutLogController = require("../controllers/workoutLogController");

const router = express.Router();

router.use(authMiddleware);

router.post("/:userId/workout-logs", workoutLogController.createLog);

module.exports = router;
