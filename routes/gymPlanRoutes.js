const express = require("express");

const gymPlanController = require("../controllers/gymPlanController");

const router = express.Router();

router.post("/:userId/gym-plans", gymPlanController.createGymPlan);
router.post("/:userId/gym-plans/generate", gymPlanController.generateGymPlan);
router.get("/:userId/gym-plans", gymPlanController.getUsersGymPlans);
router.get("/:userId/gym-plans/:planId", gymPlanController.getGymPlan);
router.put("/:userId/gym-plans/:planId", gymPlanController.updateGymPlan);
router.delete("/:userId/gym-plans/:planId", gymPlanController.deleteGymPlan);

module.exports = router;
