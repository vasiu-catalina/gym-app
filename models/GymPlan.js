const mongoose = require("mongoose");

const gymPlanSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        isAiGenerated: { type: Boolean, default: false },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        nrWeeks: { type: Number, required: true, min: 0 },
        days: [
            {
                name: { type: String, required: true },
                description: { type: String, required: true },
                exercises: [
                    {
                        name: { type: String, required: true },
                        nrSets: { type: Number, default: null },
                        nrReps: { type: Number, default: null },
                        duration: { type: Number, default: null },
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("GymPlan", gymPlanSchema);
