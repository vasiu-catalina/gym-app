const express = require("express");
const photoAlbumController = require("../controllers/photoAlbumController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/:userId/photo-albums", photoAlbumController.createAlbum);
router.get("/:userId/photo-albums", photoAlbumController.getAllAlbums);
router.get("/:userId/photo-albums/:albumId", photoAlbumController.getAlbum);
router.patch("/:userId/photo-albums/:albumId", photoAlbumController.renameAlbum);

router.post("/:userId/photo-albums/:albumId/images", upload.single("image"), photoAlbumController.uploadImage);
router.delete("/:userId/photo-albums/:albumId/images/:imageId", photoAlbumController.deleteImage);

module.exports = router;
