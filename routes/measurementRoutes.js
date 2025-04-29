const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const isUserAllowedMiddleware = require("../middleware/isUserAllowedMiddleware");
const measurementController = require("../controllers/measurementCotroller");

const router = express.Router();

router.use(authMiddleware);

router.post("/:userId/measurements", measurementController.create);
router.get("/:userId/measurements", isUserAllowedMiddleware, measurementController.getAll);
router.get("/:userId/measurements/date/:date", isUserAllowedMiddleware, measurementController.getAllByDate);
router.get("/:userId/measurements/type/:type", isUserAllowedMiddleware, measurementController.getAllByType);
router.patch("/:userId/measurements/:id", measurementController.update);
router.delete("/:userId/measurements/:id", measurementController.remove);

module.exports = router;
