const mongoose = require("mongoose");

const photoAlbumSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        user: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
        images: [
            {
                filename: { type: String, required: true },
                createdAt: { type: Date, required: true }
            }
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("PhotoAlbum", photoAlbumSchema);
