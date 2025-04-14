const Measurement = require("../models/Measurement");

const create = async (userId, data) => {
    const measurement = await Measurement.create({
        user: userId,
        type: data.type,
        unit: data.unit,
        value: data.value,
        date: data.date,
    });

    return measurement;
};

module.exports = { create };
