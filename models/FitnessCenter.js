const mongoose = require("mongoose");

const fitnessCenterSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        trainers: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("FitnessCenter", fitnessCenterSchema);