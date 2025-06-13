const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
    const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
    const uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@127.0.0.1:27017/${DB_NAME}?authSource=admin`;
    console.log(uri);
    try {
        await mongoose.connect(uri);
        console.log("Connected to database");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = {connect}