const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        birthDate: { type: Date, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        role: { type: String, enum: ["trainer", "client"] },
        gender: { type: String, enum: ["male", "female", "other"], default: "other" },
        uuid: { type: String, required: true },
        trainees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
