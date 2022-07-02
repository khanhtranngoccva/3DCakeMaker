const {expressApp, mongoClient, runServerWithDatabase} = require("./config");
const {cakeData, defaultCake} = require("./data");

function randomRange(start, end) {
    return start + Math.floor(Math.random() * (end - start));
}

function randomChoice(iterable) {
    return iterable[randomRange(0, iterable.length)];
}

async function main() {
    await runServerWithDatabase();
    const userDatabase = mongoClient.db("userData");
    const userCakes = userDatabase.collection("userCakes");

    expressApp.post("/api/createCake", async (req, res) => {
        try {
            console.log("Creating cake!!!");

            const newCake = {

            }

            await userCakes.insertOne({
                cakeFlour: "c",
                cakeMiddleFrosting: "",
                cakeTopFrosting: "",
                userAge: 27,
                candleOrganization: "base1",
                candleColor: {
                    1: "red",
                    10: "green",
                }
            })

            res.send({
                success: true,
            });
        } catch (e) {
            res.status(504).send({
                success: false
            });
        }
    });
}

main();

expressApp.delete("/api/cake/user/:cakeID", (req, res) => {
    try {
        const cakeID = req.params["cakeID"];
        const foundCake = userCakes[cakeID];
        if (!foundCake) {
            res.status(204).send({
                success: false
            });
        } else {
            delete userCakes[cakeID];
            const result = {
                success: true, data: foundCake,
            }
            res.send(result);
        }
    } catch (e) {
        res.status(504).send({
            success: false
        });
    }
});