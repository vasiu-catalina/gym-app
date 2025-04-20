const express = require("express");

const gymPlanController = require("../controllers/gymPlanController");

const router = express.Router();

router.post("/:userId/gym-plans", gymPlanController.createPlan);
router.get("/:userId/gym-plans", gymPlanController.getUsersGymPlans);

module.exports = router;
