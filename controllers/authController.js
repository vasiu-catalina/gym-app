const authService = require("../services/authService");

const register = async (req, res) => {
    try {
        const token = await authService.register(req.body);
        res.status(201).json({
            message: "User registered",
            token,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error",
        });
    }
};

module.exports = {
    register,
};
