const app = require("./app");
const db = require("./db");

db.connect().then(() => {
    app.listen(3000, () => {
        console.log("App listening on port 3000");
    });
});
