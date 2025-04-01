const mongoose = require("mongoose");

const checkInLogSchema = new mongoose.Schema(
    {
        user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
        duration: { type: Number, required: true, min:0 },
        checkInTime: { type: Date, required: true },
        checkOutTime: { type: Date, required: true },
        status: { type: String, enum: ["checked_in", "checked_out"] },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("CheckInLog", checkInLogSchema);