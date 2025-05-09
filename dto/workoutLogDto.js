const workoutLogDto = (log) => {
    return {
        id: log.id,
        user: log.user,
        name: log.name,
        description: log.description,
        duration: log.duration,
        date: log.date,
        exercises: log.exercises.map((ex) => ({
            id: ex._id,
            name: ex.name,
            sets: ex.sets.map((set) => ({
                setNr: set.setNr,
                nrReps: set.nrReps,
                weight: set.weight,
                duration: set.duration,
                completed: set.completed,
            })),
        })),
        createdAt: log.createdAt,
        updatedAt: log.updatedAt,
    };
};

const workoutLogPreviewDto = (log) => {
    return {
        id: log.id,
        user: log.user,
        name: log.name,
        description: log.description,
        duration: log.duration,
        date: log.date,
        exercises: log.exercises.length,
    };
};

module.exports = {
    workoutLogDto,
    workoutLogPreviewDto,
};
