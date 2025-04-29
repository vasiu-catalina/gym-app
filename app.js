const path = require("path");
const express = require("express");
const db = require("./db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const workoutLogRoutes = require("./routes/workoutLogRoutes");
const measurementRoutes = require("./routes/measurementRoutes");
const photoAlbumRoutes = require("./routes/photoAlbumRoutes");
const gymPlanRoutes = require("./routes/gymPlanRoutes");
const { createDir } = require("./common/functions");

const uploadDir = path.join(__dirname, "public", "uploads");
createDir(uploadDir);

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes, measurementRoutes, photoAlbumRoutes, gymPlanRoutes, workoutLogRoutes);

db.connect().then(() => {
    app.listen(3000, () => {
        console.log("App listening on port 3000");
    });
});
