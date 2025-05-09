const mongoose = require("mongoose");

const workoutLogSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, default: null },
        description: { type: String, default: null },
        duration: { type: Number, min: 0 },
        date: { type: Date, required: true },
        exercises: [
            {
                name: { type: String, required: true },
                sets: [
                    {
                        setNr: { type: Number, min: 0 },
                        nrReps: { type: Number, min: 0 },
                        weight: { type: Number, min: 0 },
                        duration: { type: Number, min: 0 },
                        completed: { type: Boolean, default: false },
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("WorkoutLog", workoutLogSchema);
