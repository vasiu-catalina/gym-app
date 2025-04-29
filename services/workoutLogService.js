const CustomError = require("../common/CustomError");
const WorkoutLog = require("../models/WorkoutLog");

const createWorkoutLog = async (userId, data) => {
    const workoutLog = WorkoutLog.create({
        user: userId,
        name: data.name,
        description: data.description,
        duration: data.duration,
        date: data.date,
        exercises: data.exercises.map((ex) => ({
            name: ex.name,
            setNr: ex.setNr,
            nrReps: ex.nrReps,
            weight: ex.weight,
            duration: ex.duration,
        })),
    });

    return workoutLog;
};

const getWorkoutLogs = async (userId) => {
    const logs = await WorkoutLog.find({ user: userId });
    return logs;
};

const getWorkoutLog = async (logId, userId) => {
    const log = await WorkoutLog.findOne({ _id: logId, user: userId });
    if (!log) {
        throw new CustomError("Workout log not found", 404);
    }
    return log;
};

module.exports = {
    createWorkoutLog,
    getWorkoutLogs,
    getWorkoutLog,
};
