const CheckInLog = require("../models/CheckInLog");

const createLog = async (userId, log) => {
    const checkInLog = await CheckInLog.create({
        user: userId,
        start: log.start,
        end: log.end,
    });
    return checkInLog;
};

module.exports = {
    createLog,
};
