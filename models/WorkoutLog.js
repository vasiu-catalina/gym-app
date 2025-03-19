const mongoose = require("mongoose");

const workoutLogSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        gymPlan: { type: mongoose.Schema.Types.ObjectId, ref: "GymPlan" },
        name: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, min: 0 },
        date: { type: Date, required: true},
        exercises: [
            {
                name: { type: String, required: true },
                setNr: { type: Number, min: 0 },
                nrReps: { type: Number, min: 0 },
                weight: { type: Number, min: 0 },
                duration: { type: Number, min: 0 },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("WorkoutLog", workoutLogSchema);
