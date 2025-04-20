const GymPlan = require("../models/GymPlan");

const createPlan = async (userId, data) => {
    const gymPlan = await GymPlan.create({
        user: userId,
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        nrWeeks: data.nrWeeks,
        days: data.days.map((day) => ({
            name: day.name,
            description: day.description,
            exercises: day.exercises.map((exercise) => ({
                name: exercise.name,
                nrSets: exercise.nrSets,
                nrReps: exercise.nrReps,
                duration: exercise.duration,
            })),
        })),
    });

    return gymPlan;
};

module.exports = { createPlan };
