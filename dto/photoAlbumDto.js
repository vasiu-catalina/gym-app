const imageDto = (i) => {
    return {
        id: i._id,
        filename: i.filename,
        date: i.date,
    };
};

const albumDto = (a) => {
    return {
        id: a._id,
        name: a.name,
        user: a.user,
        images: a.images.map(imageDto),
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
    };
};

module.exports = { albumDto, imageDto };
