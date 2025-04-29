const workoutLogDto = (log) => {
    return {
        id: log.id,
        user: log.user,
        name: log.name,
        description: log.description,
        duration: log.duration,
        date: log.date,
        exercises: log.exercises.map((ex) => ({
            name: ex.name,
            setNr: ex.setNr,
            nrReps: ex.nrReps,
            weight: ex.weight,
            duration: ex.duration,
        })),
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
