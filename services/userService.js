const CustomError = require("../common/CustomError");
const User = require("../models/User");

const getUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new CustomError("User does not exist", 404);
    }

    return user;
};

const deleteUser = async (userId) => {
    const deleted = await User.findByIdAndDelete(userId);

    if (!deleted) {
        throw new CustomError("User does not exist", 404);
    }
};

module.exports = {
    getUser,
    deleteUser,
};
