const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
    {
        client:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
        membership:{type:mongoose.Schema.Types.ObjectId, ref:"Membership"},
        autoRenewal: { type: Boolean, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        status: { type: String, enum: ["pending", "paid", "active", "inActive"] },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);