const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const CustomError = require("../common/CustomError");
const User = require("../models/User");

const getAccessToken = (payload) => {
    const { JWT_SECRET } = process.env;

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

    return token;
};

const register = async (data) => {
    const { firstname, lastname, birthDate, email, password, phone, role, gender } = data;
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

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
        gender,
        uuid: uuidv4(),
    });

    const payload = {
        sub: user._id,
        email: user.email,
        role: user.role,
    };

    return getAccessToken(payload);
};

const login = async (data) => {
    const { email, password } = data;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new CustomError("User does not exist", 404);
    }

    const isCorrectPassword = await bcrypt.compare(password, existingUser.password);

    if (!isCorrectPassword) {
        throw new CustomError("Incorrect password", 401);
    }

    const payload = {
        sub: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
    };

    return getAccessToken(payload);
};

module.exports = {
    register,
    login,
};
