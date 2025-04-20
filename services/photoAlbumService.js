const fs = require("fs").promises;
const path = require("path");
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
    const album = await PhotoAlbum.findOne({ _id: id, user: userId });
    if (!album) throw new CustomError("Abum not found", 404);
    return album;
};

const renameAlbum = async (id, userId, data) => {
    const album = await PhotoAlbum.findOneAndUpdate(
        { _id: id, user: userId },
        { $set: { name: data.name } },
        { new: true }
    );
    if (!album) throw new CustomError("Abum not found", 404);
    return album;
};

const uploadImage = async (id, userId, data, file) => {
    const album = await getAlbum(id, userId);

    const image = {
        filename: file.filename,
        date: data.date,
    };

    album.images.push(image);
    album.images.sort((a, b) => new Date(b.date) - new Date(a.date));

    return await album.save();
};

const deleteImage = async (albumId, userId, imageId) => {
    const album = await getAlbum(albumId, userId);

    const image = album.images.find((img) => img._id.toString() === imageId);
    if (!image) throw new CustomError("Image not found", 404);

    const filePath = path.join(__dirname, "../public/uploads", image.filename);
    try {
        await fs.unlink(filePath);
    } catch (err) {
        console.log(err);
    }

    album.images = album.images.filter((img) => img && img._id.toString() !== imageId);
    return await album.save();
};

module.exports = { createAlbum, getAllAlbums, getAlbum, renameAlbum, uploadImage, deleteImage };
