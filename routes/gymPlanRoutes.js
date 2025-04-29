const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const isUserAllowedMiddleware = require("../middleware/isUserAllowedMiddleware");
const gymPlanController = require("../controllers/gymPlanController");

const router = express.Router();

router.use(authMiddleware);

router.post("/:userId/gym-plans", gymPlanController.createGymPlan);
router.post("/:userId/gym-plans/generate", gymPlanController.generateGymPlan);
router.get("/:userId/gym-plans", isUserAllowedMiddleware, gymPlanController.getUsersGymPlans);
router.get("/:userId/gym-plans/:planId", isUserAllowedMiddleware, gymPlanController.getGymPlan);
router.put("/:userId/gym-plans/:planId", gymPlanController.updateGymPlan);
router.delete("/:userId/gym-plans/:planId", gymPlanController.deleteGymPlan);

module.exports = router;
