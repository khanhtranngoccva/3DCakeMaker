let cakeData = {
    candleFlameColor: {
        inputDescription: "Your cake's candle flame color",
        inputType: "color",
        default: "#ffdd66",
    },
    candleColor: {
        inputDescription: "Your cake's candle color",
        default: "#ff0000",
        inputType: "color",
        allowRainbow: true,
    },
    cakeBaseColor: {
        inputDescription: "Your cake's base color",
        default: "#1b8d14",
        inputType: "color",
    },
    cakeBaseCreamColor: {
        inputDescription: "Your cake's base cream color",
        default: "#ffffff",
        inputType: "color",
    },
    cakeCreamColor: {
        inputDescription: "Your cake's frosting color",
        default: "#ffffff",
        inputType: "color",
    },
    recipientAge: {
        inputDescription: "Your cake recipient's age",
        validChoices(n) {
            n = Number(n);
            return Number.isInteger(n) && n >= 0;
        },
        default: 18,
        inputType: "number",
    },
    cakeTopping: {
        validChoices: [ {
            value: "flakes",
            description: "Flakes",
        }, {
            value: "creamCherry",
            description: "Creamed Cherries",
        }, {
            value: "berry",
            description: "Raspberries and Blueberries"
        }],
        default: "flakes",
        inputType: "choice",
        inputDescription: "Your cake's topping",
    },
};

function generateCake(cakeProperties) {
    const processedCakeProperties = {};
    for (let key in cakeProperties) {
        if (!cakeData.hasOwnProperty(key)) {
            continue;
        }
        const defaultValue = cakeData[key].default;
        /* Default key if key does not exist in the cake properties. */
        if (!cakeProperties.hasOwnProperty(key) || cakeProperties[key] === null || cakeProperties[key] === void 0) {
            processedCakeProperties[key] = defaultValue;
            continue;
        }
        /* Validate the cake if there is one. */
        const validator = cakeData[key].validChoices;
        const curChoice = cakeProperties[key];
        if (Array.isArray(validator)) {
            if (validator.find(item => item.value === curChoice)) {
                processedCakeProperties[key] = curChoice;
            } else {
                processedCakeProperties[key] = defaultValue;
            }
        } else if (typeof validator === "function") {
            if (validator(curChoice)) {
                processedCakeProperties[key] = curChoice;
            } else {
                processedCakeProperties[key] = defaultValue;
            }
        } else {
            processedCakeProperties[key] = curChoice;
        }
    }
    return processedCakeProperties;
}

module.exports = {cakeData, generateCake};