const mongoose = require("mongoose");

const checkInLogSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("CheckInLog", checkInLogSchema);
