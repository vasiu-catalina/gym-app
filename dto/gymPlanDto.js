const exercise = (e) => {
    return {
        id: e._id,
        name: e.name,
        nrSets: e.nrSets,
        nrReps: e.nrReps,
        duration: e.duration,
    };
};

const day = (d) => {
    return {
        id: d._id,
        name: d.name,
        description: d.description,
        exercises: d.exercises.map(exercise),
    };
};

const gymPlanDto = (g) => {
    return {
        name: g.name,
        description: g.description,
        startDate: g.startDate,
        endDate: g.endDate,
        nrWeeks: g.nrWeeks,
        days: g.days.map(day),
    };
};

const gymPlanSimpleDto = (g) => {
    return {
        name: g.name,
        description: g.description,
        startDate: g.startDate,
        endDate: g.endDate,
        nrWeeks: g.nrWeeks,
        days: g.days.length,
    };
};

module.exports = { gymPlanDto, gymPlanSimpleDto };
