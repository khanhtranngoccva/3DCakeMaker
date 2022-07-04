const {expressApp, mongoClient, runServerWithDatabase} = require("./config");
const {cakeData, generateCake} = require("./data");
const mongoDB = require("mongodb");
const path = require("path");


async function main() {
    await runServerWithDatabase();
    const userDatabase = mongoClient.db("userData");
    const userCakes = userDatabase.collection("userCakes");

    expressApp.get("/", async (req, res) => {
        res.render(path.join(__dirname, "views", "homepage.ejs"));
    });


    expressApp.get("/createCake", async (req, res) => {
       res.render(path.join(__dirname, "views", "cake.ejs"), {
           cakeData,
           scriptLocation: "/static/js/createCake.js",
       });
    });

    expressApp.get("/getCake", async (req, res) => {
        res.render(path.join(__dirname, "views", "cake.ejs"), {
            cakeData,
            scriptLocation: "/static/js/getCake.js",
        });
    });

    expressApp.get("/directCake/:cakeID", async (req, res) => {
        let cakeID = req.params.cakeID;
        try {
            let result = await userCakes.find({_id: new mongoDB.ObjectId(cakeID)}).toArray();
            let lookupResult = result[0];
            if (!lookupResult) {
                res.redirect("/createCake");
            }
            res.render(path.join(__dirname, "views", "cake.ejs"), {
                cakeData,
                scriptLocation: "/static/js/getCake.js",
                cakeID,
            });
        } catch (e) {
            res.redirect("/createCake");
        }
    });

    expressApp.get("/editCake/:cakeID", async (req, res) => {
        let cakeID = req.params.cakeID;
        try {
            let result = await userCakes.find({_id: new mongoDB.ObjectId(cakeID)}).toArray();
            let lookupResult = result[0];
            if (!lookupResult) {
                res.redirect("/createCake");
            }
            res.render(path.join(__dirname, "views", "cake.ejs"), {
                cakeData,
                scriptLocation: "/static/js/editCake.js",
                cakeID,
            });
        } catch (e) {
            res.redirect("/createCake");
        }
    });

    expressApp.post("/api/createCake", async (req, res) => {
        try {
            console.log("Creating cake!!!");
            const newCake = generateCake(req.body);
            await userCakes.insertOne(newCake);
            res.send({
                success: true,
                data: newCake,
                code: 200,
            });
        } catch (e) {
            console.error(e);
            res.status(504).send({
                success: false,
            });
        }
    });

    expressApp.put("/api/editCake", async (req, res) => {
        try {
            console.log(`Editing cake!!! Cake is ${req.body._id}`);
            const newCake = generateCake(req.body);
            await userCakes.findOneAndUpdate({
                _id: new mongoDB.ObjectId(req.body._id)
            }, {
                $set: newCake,
            });
            res.send({
                success: true,
                data: newCake,
                code: 200,
            });
        } catch (e) {
            console.error(e);
            res.status(504).send({
                success: false,
            });
        }
    });

    expressApp.get("/api/getCake/:cakeID", async (req, res) => {
        try {
            const cakeID = req.params["cakeID"];
            console.log(`Getting cake!!! ID is ${cakeID}`);
            let result = await userCakes.find({_id: new mongoDB.ObjectId(cakeID)}).toArray();
            let lookupResult = result[0];
            if (!lookupResult) {
                res.status(404).send({
                    success: false,
                    data: null,
                    code: 404,
                });
            } else {
                const cake = generateCake(lookupResult);
                res.send({
                    success: true,
                    data: cake,
                    code: 200,
                });
            }
        } catch (e) {
            console.error(e);
            res.status(504).send({
                success: false,
                code: 504,
            });
        }
    });

    expressApp.delete("/api/deleteCake", async (req, res) => {
        try {
            const cakeID = req.body.cakeID;
            console.log(`Deleting cake!!! ID is ${cakeID}`);
            await userCakes.deleteOne({_id: new mongoDB.ObjectId(cakeID)});
            res.send({
                success: true,
                code: 200,
            });
        } catch (e) {
            console.error(e);
            res.status(504).send({
                success: false,
                code: 504,
            });
        }
    });
}

main();