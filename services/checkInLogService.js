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

module.exports = {
    createLog,
    getAll,
};
