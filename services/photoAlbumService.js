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

module.exports = { createAlbum, getAllAlbums };
