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
            sets: ex.sets.map((set) => ({
                setNr: set.setNr,
                nrReps: set.nrReps,
                weight: set.weight,
                duration: set.duration,
                completed: set.completed,
            })),
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

const updateWorkoutLog = async (logId, userId, data) => {
    const log = await WorkoutLog.findOneAndUpdate(
        { _id: logId, user: userId },
        {
            $set: {
                name: data.name,
                description: data.description,
                duration: data.duration,
                date: data.date,
                exercises: data.exercises.map((ex) => ({
                    name: ex.name,
                    sets: ex.sets.map((set) => ({
                        setNr: set.setNr,
                        nrReps: set.nrReps,
                        weight: set.weight,
                        duration: set.duration,
                        completed: set.completed,
                    })),
                })),
            },
        },
        { new: true, runValidators: true }
    );
    if (!log) {
        throw new CustomError("Workout log not found", 404);
    }
    return log;
};

const deleteWorkoutLog = async (logId, userId) => {
    const log = await WorkoutLog.findOneAndDelete({ _id: logId, user: userId });
    if (!log) {
        throw new CustomError("Workout log not found", 404);
    }
};

module.exports = {
    createWorkoutLog,
    getWorkoutLogs,
    getWorkoutLog,
    updateWorkoutLog,
    deleteWorkoutLog,
};
