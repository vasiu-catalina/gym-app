module.exports = (log) => {
    return {
        id: log._id,
        user: log.user,
        start: log.start,
        end: log.end,
    };
};
