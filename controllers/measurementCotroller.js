const measurementDto = require("../dto/measurementDto");
const measurementService = require("../services/measurementService");

const create = async (req, res) => {
    try {
        const measurement = await measurementService.create(req.params.userId, req.body);

        res.status(201).json({
            message: "Measurement created",
            measurement: measurementDto(measurement),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

const getAll = async (req, res) => {
    try {
        const measurements = await measurementService.getAll(req.params.userId);

        res.status(200).json({
            message: "Measurements retrieved",
            measurements: measurements.map(measurementDto),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

const getAllByType = async (req, res) => {
    try {
        const measurements = await measurementService.getAllByType(req.params.userId, req.params.type);

        res.status(200).json({
            message: "Measurements retrieved",
            measurements: measurements.map(measurementDto),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

const getAllByDate = async (req, res) => {
    try {
        const measurements = await measurementService.getAllByDate(req.params.userId, req.params.date);

        res.status(200).json({
            message: "Measurements retrieved",
            measurements: measurements.map(measurementDto),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

const update = async (req, res) => {
    try {
        const measurement = await measurementService.update(req.params.id, req.params.userId, req.body);

        res.status(200).json({
            message: "Measurements updated",
            measurements: measurementDto(measurement),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

module.exports = {
    create,
    getAll,
    getAllByType,
    getAllByDate,
    update,
};
