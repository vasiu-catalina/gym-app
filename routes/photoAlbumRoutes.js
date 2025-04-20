const express = require("express");
const photoAlbumController = require("../controllers/photoAlbumController");

const router = express.Router();

router.post("/:userId/photo-albums", photoAlbumController.createAlbum);
router.get("/:userId/photo-albums", photoAlbumController.getAllAlbums);
router.get("/:userId/photo-albums/:albumId", photoAlbumController.getAlbum);

module.exports = router;
