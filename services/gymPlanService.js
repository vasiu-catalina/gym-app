const CustomError = require("../common/CustomError");
const openAi = require("../common/openAi");
const GymPlan = require("../models/GymPlan");

const getOpenAiResponse = async (data) => {
    const content = `
    Input: ${JSON.stringify(data)}

    Task: Please provide gym plan based on input.

    Output: Only this as pure valid JSON, no quotes or markups, no \`\`\`json:
    ${JSON.stringify({
        name: "String",
        description: "String",
        days: [
            {
                name: "String",
                description: "String",
                exercises: [
                    {
                        name: "String",
                        nrSets: "Number|null",
                        nrReps: "Number|null",
                        duration: "Number|null",
                    },
                ],
            },
        ],
        startDate: "Date",
        endDate: "Date",
        nrWeeks: "Number",
        createdAt: "Datetime",
        updatedAt: "Datetime",
    })}
    `;

    const response = await openAi(content);

    return JSON.parse(response);
};

const getContentData = (user, data) => {
    return {
        userProfile: {
            birthDate: user.birthDate,
            gender: user.gender,
            heightCm: data.height,
            weightKg: data.weight,
            fitnessLevel: data.fitnessLevel,
            injuriesOrConditions: data.injuriesOrConditions,
        },
        goals: {
            primaryGoal: data.primaryGoal,
            secondaryGoals: data.secondaryGoals,
        },
        schedulePreferences: {
            workoutDaysPerWeek: data.workoutDaysPerWeek,
            preferredWorkoutDurationMinutes: data.preferredWorkoutDurationMinutes,
            availableDays: data.availableDays,
            preferredWorkoutType: data.preferredWorkoutType,
            startDate: data.startDate,
            endDate: data.endDate,
        },
        workoutPreferences: {
            trainingStyle: data.trainingStyle,
            focusMuscleGroups: data.focusMuscleGroups,
            exerciseRestrictions: data.exerciseRestrictions,
            favoriteExercises: data.favoriteExercises,
        },
    };
};

const generateGymPlan = async (user, data) => {
    const response = await getOpenAiResponse(getContentData(user, data));

    console.log(response);

    const gymPlan = await GymPlan.create({
        user: user._id,
        isAiGenerated: true,
        ...response,
    });

    return gymPlan;
};

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

module.exports = { generateGymPlan, createGymPlan, getUsersGymPlans, getGymPlan, updateGymPlan, deleteGymPlan };
