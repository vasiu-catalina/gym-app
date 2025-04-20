const express = require("express");
const photoAlbumController = require("../controllers/photoAlbumController");

const router = express.Router();

router.post("/:userId/photo-albums", photoAlbumController.createAlbum);

module.exports = router;
