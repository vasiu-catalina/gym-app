const CustomError = require("../common/CustomError");
const CheckInLog = require("../models/CheckInLog");

const createLog = async (userId, log) => {
    const checkInLog = await CheckInLog.create({
        user: userId,
        start: log.start,
        end: log.end,
    });
    return checkInLog;
};

const getAll = async (userId) => {
    const logs = await CheckInLog.find({ user: userId });
    return logs;
};

const updateLog = async (logId, userId, log) => {
    const updated = await CheckInLog.findOneAndUpdate(
        { _id: logId, user: userId },
        {
            $set: { start: log.start, end: log.end },
        },
        { new: true }
    );

    if (!updated) {
        throw new CustomError("Log not found", 404);
    }
    return updated;
};

const deleteLog = async (logId, userId) => {
    const deleted = await CheckInLog.findOneAndDelete({ _id: logId, user: userId });
    if (!deleted) {
        throw new CustomError("Log not found", 404);
    }
};

module.exports = {
    createLog,
    getAll,
    updateLog,
    deleteLog
};
