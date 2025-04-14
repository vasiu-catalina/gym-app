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

const getAll = async (userId) => await Measurement.find({ user: userId }).sort({ date: -1 });

const getAllByDate = async (userId, date) => {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    return await Measurement.find({ user: userId, date: { $gte: start, $lt: end } }).sort({ date: -1 });
};

module.exports = {
    create,
    getAll,
    getAllByDate,
};
