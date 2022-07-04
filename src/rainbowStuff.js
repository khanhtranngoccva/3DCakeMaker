import {renderCake, currentCakeSetup, specialKeywords} from "./cakeSetup";

function makeThisRainbow(property) {
    currentCakeSetup[property] = specialKeywords.rainbow;
    renderCake();
}

const body = document.querySelector("body");
body.delegate("click", ".makeThisRainbow", function(e) {
    e.preventDefault();
    const sibling = this.parentElement.querySelector("input[type='color']");
    if (sibling) {
        makeThisRainbow(sibling.name);
    }
});


console.log("%cRainbow stuff", "color: red");