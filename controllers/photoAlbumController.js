const { albumDto, imageDto } = require("../dto/photoAlbumDto");
const photoAlbumService = require("../services/photoAlbumService");

const createAlbum = async (req, res) => {
    try {
        const album = await photoAlbumService.createAlbum(req.params.userId, req.body);
        res.status(201).json({
            message: "Album created",
            album: albumDto(album),
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
            albums: albums.map(albumDto),
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
            album: albumDto(album),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

const renameAlbum = async (req, res) => {
    try {
        const album = await photoAlbumService.renameAlbum(req.params.albumId, req.params.userId, req.body);
        res.status(200).json({
            message: "Album renamed",
            album: albumDto(album),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

const uploadImage = async (req, res) => {
    try {
        const album = await photoAlbumService.uploadImage(req.params.albumId, req.params.userId, req.body, req.file);
        res.status(200).json({
            message: "Image uploaded",
            album: albumDto(album),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

const deleteImage = async (req, res) => {
    try {
        const album = await photoAlbumService.deleteImage(req.params.albumId, req.params.userId, req.params.imageId);
        res.status(200).json({
            message: "Image deleted",
            album: albumDto(album),
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message || "An unknown error occured",
        });
    }
};

module.exports = { createAlbum, getAllAlbums, getAlbum, renameAlbum, uploadImage, deleteImage };
