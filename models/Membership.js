const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, enum: ["gym_access", "personal_trainer"] },
        description: { type: String, required: true },
        price: { type: Number, required: true, min:0 },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Membership", membershipSchema);