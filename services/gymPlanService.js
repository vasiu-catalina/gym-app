const CustomError = require("../common/CustomError");
const GymPlan = require("../models/GymPlan");

const createGymPlan = async (userId, data) => {
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

const getUsersGymPlans = async (userId) => {
    const gymPlans = await GymPlan.find({ user: userId });
    return gymPlans;
};

const getGymPlan = async (id, userId) => {
    const gymPlan = await GymPlan.findOne({ _id: id, user: userId });
    if (!gymPlan) throw new CustomError("Gym plan not found", 404);
    return gymPlan;
};

const updateGymPlan = async (id, userId, data) => {
    const gymPlan = await GymPlan.findOneAndUpdate(
        { _id: id, user: userId },
        {
            $set: {
                name: data.name,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                nrWeeks: data.nrWeeks,
                days: data.days.map((day) => ({
                    _id: day.id,
                    name: day.name,
                    description: day.description,
                    exercises: day.exercises.map((exercise) => ({
                        _id: exercise.id,
                        name: exercise.name,
                        nrSets: exercise.nrSets,
                        nrReps: exercise.nrReps,
                        duration: exercise.duration,
                    })),
                })),
            },
        },
        { new: true }
    );

    if (!gymPlan) throw new CustomError("Gym plan not found", 404);
    return gymPlan;
};

const deleteGymPlan = async (id, userId) => {
    const deleted = await GymPlan.findOneAndDelete({ _id: id, user: userId });
    if (!deleted) throw new CustomError("Gym plan not found", 404);
};

module.exports = { createGymPlan, getUsersGymPlans, getGymPlan, updateGymPlan , deleteGymPlan};
