const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, required: true },
        unit: { type: String, enum: ["kg", "cm"], required: true },
        value: { type: Number, min: 0, required: true },
        type: {
            type: String,
            required: true,
            enum: [
                "Biceps",
                "Triceps",
                "Forearm",
                "Chest",
                "Waist",
                "Hips",
                "Quads",
                "Calf",
                "Shoulders",
                "Back",
                "Glutes",
                "Abdomen",
                "Weight",
            ],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Measurement", measurementSchema);
