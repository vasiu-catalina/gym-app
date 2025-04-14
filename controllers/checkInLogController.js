const checkInLogDto = require("../dto/checkInLogDto");
const checkInLogService = require("../services/checkInLogService");

const createLog = async (req, res) => {
    try {
        const log = await checkInLogService.createLog(req.params.userId, req.body);

        res.status(201).json({
            message: "Log created",
            checkInLog: checkInLogDto(log),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Unknown error occured",
        });
    }
};

const getAll = async (req, res) => {
    try {
        const logs = await checkInLogService.getAll(req.params.userId);
        res.status(200).json({
            message: "Logs retrieved",
            checkInLogs: logs.map(checkInLogDto),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Unknown error occured",
        });
    }
};

const updateLog = async (req, res) => {
    try {
        const log = await checkInLogService.updateLog(req.params.logId, req.params.userId, req.body);
        res.status(200).json({
            message: "Logs updated",
            checkInLog: checkInLogDto(log),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Unknown error occured",
        });
    }
};

const deleteLog = async (req, res) => {
    try {
        await checkInLogService.deleteLog(req.params.logId, req.params.userId);
        res.status(204).send();
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.essage || "Unknown error occured",
        });
    }
};

module.exports = {
    createLog,
    getAll,
    updateLog,
    deleteLog,
};
