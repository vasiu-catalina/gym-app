const { gymPlanDto, gymPlanSimpleDto } = require("../dto/gymPlanDto");
const gymPlanService = require("../services/gymPlanService");

const createGymPlan = async (req, res) => {
    try {
        const gymPlan = await gymPlanService.createGymPlan(req.params.userId, req.body);
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

const getUsersGymPlans = async (req, res) => {
    try {
        const gymPlans = await gymPlanService.getUsersGymPlans(req.params.userId);
        res.status(201).json({
            message: "Gym plans retrieved",
            gymPlans: gymPlans.map(gymPlanSimpleDto),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

const getGymPlan = async (req, res) => {
    try {
        const gymPlan = await gymPlanService.getGymPlan(req.params.planId, req.params.userId);
        res.status(200).json({
            message: "Gym plan retrieved",
            gymPlan: gymPlanDto(gymPlan),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

const updateGymPlan = async (req, res) => {
    try {
        const gymPlan = await gymPlanService.updateGymPlan(req.params.planId, req.params.userId, req.body);
        res.status(200).json({
            message: "Gym plan updated",
            gymPlan: gymPlanDto(gymPlan),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

const deleteGymPlan = async (req, res) => {
    try {
        await gymPlanService.deleteGymPlan(req.params.planId, req.params.userId);
        res.status(204).send();
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

module.exports = {
    createGymPlan,
    getUsersGymPlans,
    getGymPlan,
    updateGymPlan,
    deleteGymPlan,
};
