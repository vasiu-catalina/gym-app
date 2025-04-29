const workoutLogDto = require("../dto/workoutLogDto");
const workoutLogService = require("../services/workoutLogService");

const createLog = async (req, res) => {
    try {
        const log = await workoutLogService.createWorkoutLog(req.params.userId, req.body);

        res.status(201).json({
            message: "Workout log created",
            workoutLog: workoutLogDto(log),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Unknown error occured",
        });
    }
};

module.exports = {
    createLog,
};
