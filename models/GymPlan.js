const mongoose = require("mongoose");

const gymPlanSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
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
                        nrSets: { type: Number, min: 0 },
                        nrReps: { type: Number, min: 0 },
                        duration: { type: Number, min: 0 },
                    }
                ]
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("GymPlan", gymPlanSchema);
