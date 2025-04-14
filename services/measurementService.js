const CustomError = require("../common/CustomError");
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

const getAllByType = async (userId, type) => await Measurement.find({ user: userId, type }).sort({ date: -1 });

const getAllByDate = async (userId, date) => {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    return await Measurement.find({ user: userId, date: { $gte: start, $lt: end } }).sort({ date: -1 });
};

const update = async (id, userId, measurement) => {
    const data = {
        type: measurement.type,
        unit: measurement.unit,
        value: measurement.value,
        date: measurement.date,
    };
    const updated = await Measurement.findOneAndUpdate({ _id: id, user: userId }, { $set: data }, { new: true });

    if (!updated) {
        throw new CustomError("Measurement not found", 404);
    }

    return updated;
};

const remove = async (id, userId) => {
    const deleted = await Measurement.findOneAndDelete({ _id: id, user: userId });
    if (!deleted) {
        throw new CustomError("Measurement not found", 404);
    }
};

module.exports = {
    create,
    getAll,
    getAllByType,
    getAllByDate,
    update,
    remove,
};
