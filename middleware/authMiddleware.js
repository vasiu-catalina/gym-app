const jwt = require("jsonwebtoken");
const CustomError = require("../common/CustomError");
const userService = require("../services/userService");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            throw new CustomError("Missing authorization header", 401);
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new CustomError("Missing token", 401);
        }

        const SECRET_KEY = process.env.JWT_SECRET;

        jwt.verify(token, SECRET_KEY, async (err, payload) => {
            try {
                if (err) {
                    throw new CustomError("Invalid or expired token", 401);
                }

                const user = await userService.getUser(payload.sub);
                if (!user) {
                    throw new CustomError("User not found", 404);
                }

                req.user = user;
                next();
            } catch (err) {
                res.status(err.statusCode || 500).json({
                    message: err.message || "Internal server error",
                });
            }
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error",
        });
    }
};

module.exports = authMiddleware;
