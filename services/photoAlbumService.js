const CustomError = require("../common/CustomError");
const photoAlbumDto = require("../dto/photoAlbumDto");
const PhotoAlbum = require("../models/PhotoAlbum");

const createAlbum = async (userId, data) => {
    const photoAlbum = await PhotoAlbum.create({
        user: userId,
        name: data.name,
    });
    return photoAlbum;
};

const getAllAlbums = async (userId) => {
    const albums = await PhotoAlbum.find({ user: userId });
    return albums;
};

const getAlbum = async (id, userId) => {
    const album = await PhotoAlbum.findOne({_id: id, user: userId});
    if (!album) throw new CustomError('Abum not found', 404);
    return album;
};

module.exports = { createAlbum, getAllAlbums, getAlbum };
