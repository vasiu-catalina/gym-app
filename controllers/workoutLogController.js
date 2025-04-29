const { workoutLogDto, workoutLogPreviewDto } = require("../dto/workoutLogDto");
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

const getLogs = async (req, res) => {
    try {
        const logs = await workoutLogService.getWorkoutLogs(req.params.userId);

        res.status(200).json({
            message: "Workout logs retrieved",
            workoutLog: logs.map(workoutLogPreviewDto),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Unknown error occured",
        });
    }
};

const getLog = async (req, res) => {
    try {
        const log = await workoutLogService.getWorkoutLog(req.params.logId, req.params.userId);

        res.status(200).json({
            message: "Workout log retrieved",
            workoutLog: workoutLogDto(log),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Unknown error occured",
        });
    }
};

const updateLog = async (req, res) => {
    try {
        const log = await workoutLogService.updateWorkoutLog(req.params.logId, req.params.userId, req.body);

        res.status(200).json({
            message: "Workout log updated",
            workoutLog: workoutLogDto(log),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Unknown error occured",
        });
    }
};

const deleteLog = async (req, res) => {
    try {
        await workoutLogService.deleteWorkoutLog(req.params.logId, req.params.userId);
        res.status(204).send();
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Unknown error occured",
        });
    }
};

module.exports = {
    createLog,
    getLogs,
    getLog,
    updateLog,
    deleteLog,
};
