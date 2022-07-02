const express = require("express");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectionString = process.env.MONGODB_SECRET;
const mongodb = require("mongodb");

const expressApp = express();

expressApp.use("/static", express.static(path.join(__dirname, "public")));
expressApp.use(express.json());
expressApp.use(express.urlencoded());
expressApp.set("view engine", "ejs");

const mongoClient = new mongodb.MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: mongodb.ServerApiVersion.v1
});

function runServerWithDatabase() {
    return new Promise(resolve => {
        mongoClient.connect().then(() => {
            console.log("Database connected!");
            expressApp.listen(PORT, () => {
                console.log("Listening at port", PORT);
                resolve();
            });
        });
    });
}

module.exports = {expressApp, mongoClient, runServerWithDatabase};