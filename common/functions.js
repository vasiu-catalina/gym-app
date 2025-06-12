const fs = require("fs");

const createDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }); // `recursive` ensures nested dirs are created
        if (process.env.NODE_ENV !== "test") {
            console.log(`Dir "${dir}" created.`);
        }
    } else {
        if (process.env.NODE_ENV !== "test") {
            console.log(`Dir: "${dir}" already exists.`);
        }
    }
};

module.exports = { createDir };
