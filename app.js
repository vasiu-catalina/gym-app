const express = require("express");
const db = require("./db");

const app = express();

db.connect().then(()=> {
    app.listen(3000, ()=>{
        console.log("App listening on port 3000");
    });
});
