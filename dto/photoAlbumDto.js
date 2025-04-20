const imageDto = (i) => {
    return {
        id: i._id,
        filename: i.filename,
        createdAt: i.createdAt,
    };
};

module.exports = (a) => {
    return {
        id: a._id,
        name: a.name,
        user: a.user,
        images: a.images.map(imageDto),
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
    };
};
