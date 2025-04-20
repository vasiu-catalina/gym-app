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

const getAllAlbums = async (req, res) => {
    try {
        const albums = await photoAlbumService.getAllAlbums(req.params.userId);
        res.status(200).json({
            message: "Albums retrieved",
            albums: albums.map(photoAlbumDto),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

const getAlbum = async (req, res) => {
    try {
        const album = await photoAlbumService.getAlbum(req.params.albumId, req.params.userId);
        res.status(200).json({
            message: "Album retrieved",
            album: photoAlbumDto(album),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

module.exports = { createAlbum, getAllAlbums, getAlbum };
