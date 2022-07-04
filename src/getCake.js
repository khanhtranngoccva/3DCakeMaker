import {} from "./HTMLDelegate";
import {currentCakeSetup, renderCake} from "./cakeSetup";

const createCakeForm = document.querySelector(".createCakeForm");
function getDefaultCakeFromHiddenForm() {
    for (let inputElement of createCakeForm.querySelectorAll("input, s")) {
        const property = inputElement.name;
        currentCakeSetup[property] = inputElement.value;
    }
    renderCake();
}
Array.from(document.querySelectorAll("form")).map(f => f.style.display = "none");
const getCakeForm = document.querySelector(".getCakeForm");
const errorPopup = getCakeForm.querySelector(".message");
async function getCake(cakeID) {
    const cakeJSON = await (await fetch("/api/getCake/" + cakeID)).json();
    console.log(cakeJSON);
    if (cakeJSON.code === 404) {
        errorPopup.innerText = "Sorry, we didn't found your requested cake.";
    } else {
        errorPopup.innerText = ""
    }
    Object.assign(currentCakeSetup, cakeJSON.data);
    renderCake();
}
let directCakeCode = document.querySelector("#directCakeID").innerText.trim();
if (directCakeCode) {
    getCake(directCakeCode);
} else {
    getCakeForm.style.display = "flex";
    getDefaultCakeFromHiddenForm();
}

getCakeForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    await getCake(document.querySelector("#getCakeID").value);
});

