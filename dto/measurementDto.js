module.exports = (m) => {
    return {
        id: m._id,
        user: m.user,
        date: m.date,
        unit: m.unit,
        value: m.value,
        type: m.type,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
    };
};
