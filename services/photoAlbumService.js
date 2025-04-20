const fs = require("fs").promises;
const path = require("path");
const CustomError = require("../common/CustomError");
const PhotoAlbum = require("../models/PhotoAlbum");

const deleteFiles = async (filePaths) => {
    try {
        await Promise.all(
            filePaths.map(async (filePath) => {
                try {
                    await fs.unlink(filePath);
                    console.log(`Deleted: ${filePath}`);
                } catch (err) {
                    console.warn(`Failed to delete ${filePath}:`, err.message);
                }
            })
        );
    } catch (err) {
        console.error("Error deleting files:", err.message);
    }
};

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
    if (!album) throw new CustomError("Album not found", 404);
    return album;
};

const renameAlbum = async (id, userId, data) => {
    const album = await PhotoAlbum.findOneAndUpdate(
        { _id: id, user: userId },
        { $set: { name: data.name } },
        { new: true }
    );
    if (!album) throw new CustomError("Album not found", 404);
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

const deleteImages = async (albumId, userId, imageIds) => {
    const album = await getAlbum(albumId, userId);

    const images = album.images
        .filter((img) => imageIds.includes(img._id.toString()))
        .map((img) => path.join(__dirname, "../public/uploads", img.filename));

    await deleteFiles(images);

    album.images = album.images.filter((img) => !imageIds.includes(img._id.toString()));
    return await album.save();
};

const deleteAlbum = async (id, userId) => {
    const album = await getAlbum(id, userId);
    const images = album.images.map((img) => path.join(__dirname, "../public/uploads", img.filename));

    await deleteFiles(images);
    return await album.deleteOne();
};

module.exports = { createAlbum, getAllAlbums, getAlbum, renameAlbum, uploadImage, deleteImages, deleteAlbum };
