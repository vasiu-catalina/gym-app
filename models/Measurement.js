const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        unit: {type: String, enum: ["kg", "cm"]},
        type: {
            type: String,
            enum: [
                'Biceps',
                'Triceps',
                'Forearm',
                'Chest',
                'Waist',
                'Hips',
                'Quads',
                'Calf',
                'Shoulders',
                'Back',
                'Glutes',
                'Abdomen',
                'Weight',
            ],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Measurement", measurementSchema);
