const userDto = require("../dto/userDto");
const userService = require("../services/userService");

const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.userId);
        res.status(200).json({
            message: "User found",
            user: userDto(user),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error",
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.userId);
        res.status(204).send();
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error",
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.userId, req.body);
        res.status(200).json({
            message: "User updated",
            user: userDto(updatedUser),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "Internal server error",
        });
    }
};

module.exports = {
    getUser,
    deleteUser,
    updateUser,
};
