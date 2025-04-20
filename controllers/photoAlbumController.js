const photoAlbumDto = require("../dto/photoAlbumDto");
const photoAlbumService = require("../services/photoAlbumService");

const createAlbum = async (req, res) => {
    try {
        const album = await photoAlbumService.createAlbum(req.params.userId, req.body);
        res.status(201).json({
            message: "Album created",
            album: photoAlbumDto(album),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

module.exports = { createAlbum };
