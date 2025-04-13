const express = require("express");
const db = require("./db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const checkInLogRoutes = require("./routes/checkInLogRoutes");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes, checkInLogRoutes);

db.connect().then(() => {
    app.listen(3000, () => {
        console.log("App listening on port 3000");
    });
});
