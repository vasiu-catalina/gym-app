const gymPlanDto = require("../dto/gymPlanDto");
const gymPlanService = require("../services/gymPlanService");

const createPlan = async (req, res) => {
    try {
        const gymPlan = await gymPlanService.createPlan(req.params.userId, req.body);
        res.status(201).json({
            message: "Gym plan created",
            gymPlan: gymPlanDto(gymPlan),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

module.exports = {
    createPlan,
};
