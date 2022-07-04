import {renderCandles} from "./3dText";
import * as DimensionCSS from "./DimensionCSS";
DimensionCSS.toggleParallax();

let specialKeywords = {
    rainbow: `linear-gradient(
        rgba(255, 0, 0, 1) 10%,
        rgba(255, 154, 0, 1) 20%,
        rgba(208, 222, 33, 1) 30%,
        rgba(79, 220, 74, 1) 40%,
        rgba(63, 218, 216, 1) 50%,
        rgba(47, 201, 226, 1) 60%,
        rgba(28, 127, 238, 1) 70%,
        rgba(95, 21, 242, 1) 80%,
        rgba(186, 12, 248, 1) 90%)`
}

let currentCakeSetup = {
    candleFlameColor: "#fd6",
    candleColor: "pink",
    cakeBaseColor: "#269d26",
    cakeBaseCreamColor: "#ffffff",
    cakeCreamColor: "#7cda9a",
    recipientAge: 27,
    cakeTopping: "creamCherry",
};

let toppingToClass = {
    flakes: ".flakeTopping",
    creamCherry: ".creamCherryTopping",
    berry: ".berryTopping",
};

function renderCake() {
    renderCandles();
    Array.from(document.querySelectorAll(".flame")).map(
        flame => flame.style.setProperty("--mainColor", currentCakeSetup.candleFlameColor));
    Array.from(document.querySelectorAll(".candleChar")).map(
        candle => candle.style.setProperty("--candleColor", currentCakeSetup.candleColor));
    Array.from(document.querySelectorAll(".cakeBase")).map(
        base => base.style.setProperty("--baseColor", currentCakeSetup.cakeBaseColor));
    Array.from(document.querySelectorAll(".cakeBase")).map(
        base => base.style.setProperty("--baseCreamColor", currentCakeSetup.cakeBaseCreamColor));
    Array.from(document.querySelectorAll(".cakeIcing")).map(
        base => base.style.setProperty("--topCreamColor", currentCakeSetup.cakeCreamColor));
    Array.from(document.querySelectorAll(".creamBase")).map(
        base => base.style.setProperty("--primaryColor", currentCakeSetup.cakeCreamColor));
    Array.from(document.querySelectorAll(".cakeTopping")).map(
        topping => topping.style.display = "none");
    Array.from(document.querySelectorAll(toppingToClass[currentCakeSetup.cakeTopping])).map(
        topping => topping.style.display = "block");
    Array.from(document.querySelectorAll(".candleText")).map(
        text => text.setAttribute("text", currentCakeSetup.recipientAge));
    DimensionCSS.render();

}

export default renderCake;