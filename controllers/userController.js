const userService = require("../services/userService");

const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.userId);
        res.status(200).json({
            message: "User found",
            user,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error",
        });
    }
};

module.exports = {
    getUser,
};