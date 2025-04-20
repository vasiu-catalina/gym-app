const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${req.params.albumId}-${Date.now()}`;
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isValid =
        allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);
    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
