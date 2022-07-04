const path = require("path");

module.exports = {
    entry: {
        getCake: path.join(__dirname, "src", "getCake.js"),
        createCake: path.join(__dirname, "src", "createCake.js"),
        editCake: path.join(__dirname, "src", "editCake.js"),
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "public", "js"),
    },
    watch: true,
    mode: "production",
}