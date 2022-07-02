const path = require("path");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        filename: "build.js",
        path: path.join(__dirname, "build"),
    },
    watch: true,
    mode: "development",
}