const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CustomError = require("../common/CustomError");
const User = require("../models/User");

const register = async (data) => {
    const { firstname, lastname, birthDate, email, password, phone, role } = data;
    const existingUser = await User.findOne({ $or: [{email}, {phone}] });

    if (existingUser) {
        throw new CustomError("Email or phone already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstname,
        lastname,
        birthDate,
        email,
        password: hashedPassword,
        phone,
        role,
    });

    const { JWT_SECRET } = process.env;
    const payload = {
        sub: user._id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

    return token;
};

module.exports = {
    register,
};
