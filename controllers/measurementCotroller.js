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

module.exports = {
    create,
};
