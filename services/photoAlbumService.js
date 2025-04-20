const PhotoAlbum = require("../models/PhotoAlbum");

const createAlbum = async (userId, data) => {
    const photoAlbum = await PhotoAlbum.create({
        user: userId,
        name: data.name,
    });
    return photoAlbum;
};

module.exports = { createAlbum };
