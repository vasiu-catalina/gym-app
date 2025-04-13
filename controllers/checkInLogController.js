const checkInLogDto = require("../dto/checkInLogDto");
const checkInLogService = require("../services/checkInLogService");

const createLog = async (req, res) => {
    try {
        const log = await checkInLogService.createLog(req.params.userId, req.body);

        res.status(201).json({ checkInLog: checkInLogDto(log) });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Unknown error occured",
        });
    }
};

module.exports = {
    createLog,
};
