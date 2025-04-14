const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const measurementController = require("../controllers/measurementCotroller");

const router = express.Router();

router.use(authMiddleware);
router.post("/:userId/measurements", measurementController.create);
router.get("/:userId/measurements", measurementController.getAll);

module.exports = router;
