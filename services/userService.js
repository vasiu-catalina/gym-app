const bcrypt = require("bcrypt");
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
    const { firstname, lastname, birthDate, email, phone, gender } = data;

    const existingUser = await User.findOne({
        $or: [{ email }, { phone }],
        _id: { $ne: userId },
    });

    if (existingUser) {
        throw new CustomError("Email or phone already exists", 409);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { firstname, lastname, birthDate, email, phone, gender } },
        { new: true }
    );

    if (!updatedUser) {
        throw new CustomError("User does not exist", 404);
    }

    return updatedUser;
};

const changePassword = async (user, data) => {
    const isCorrectPassword = await bcrypt.compare(data.password, user.password);

    if (!isCorrectPassword) {
        throw new CustomError("Incorrect password", 401);
    }
    user.password = await bcrypt.hash(data.newPassword, 10);
    await user.save();
};

module.exports = {
    getUser,
    deleteUser,
    updateUser,
    changePassword,
};
