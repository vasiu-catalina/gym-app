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

const updateUser = async (userId, data) => {
    const { firstname, lastname, birthDate, email, phone } = data;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
        throw new CustomError("Email or phone already exists", 409);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { firstname, lastname, birthDate, email, phone } },
        { new: true }
    );

    if (!updatedUser) {
        throw new CustomError("User does not exist", 404);
    }

    return updatedUser;
};

module.exports = {
    getUser,
    deleteUser,
    updateUser,
};
