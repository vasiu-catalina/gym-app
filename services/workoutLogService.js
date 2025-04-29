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

module.exports = {
    createWorkoutLog,
};
