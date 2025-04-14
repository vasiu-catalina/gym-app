const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const measurementController = require("../controllers/measurementCotroller");

const router = express.Router();

router.use(authMiddleware);
router.post("/:userId/measurements", measurementController.create);
router.get("/:userId/measurements", measurementController.getAll);
router.get("/:userId/measurements/date/:date", measurementController.getAllByDate);
router.get("/:userId/measurements/type/:type", measurementController.getAllByType);

module.exports = router;
