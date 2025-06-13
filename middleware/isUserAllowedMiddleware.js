const CustomError = require("../common/CustomError");

const isEqualId = (user, id) => user._id.toString() === id;

const isTrainer = (currentUser, userId) => {
    if (currentUser.role === "client") return false;

    for (let trainee of currentUser.trainees || []) {
        if (isEqualId(trainee._id, userId)) {
            return true;
        }
    }
    return false;
};

const authMiddleware = (req, res, next) => {
    try {
        const currentUser = req.user;
        const wantedUserId = req.params.userId;
        
        if (isEqualId(currentUser, wantedUserId) || isTrainer(currentUser, wantedUserId)) {
            return next();
        }
        throw new CustomError("You are not allowed to perform this action", 403);
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error",
        });
    }
};

module.exports = authMiddleware;
