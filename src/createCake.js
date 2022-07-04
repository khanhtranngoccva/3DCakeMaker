import {} from "./HTMLDelegate";
import {renderCake, currentCakeSetup} from "./cakeSetup";

Array.from(document.querySelectorAll("form")).map(f => f.style.display = "none");
const createCakeForm = document.querySelector(".createCakeForm");
createCakeForm.style.display = "flex";

function getCakeDataFromForm() {
    for (let inputElement of createCakeForm.querySelectorAll("input, select")) {
        const property = inputElement.name;
        const value = inputElement.value;
        if (inputElement.matches("[type=color]")) {
            inputElement.style.setProperty("--currentColor", value);
        }
        currentCakeSetup[property] = value;
    }
    renderCake();
}


createCakeForm.delegate("change", "input, select", function () {
    getCakeDataFromForm();
});

createCakeForm.delegate("input", "input, select", function () {
    getCakeDataFromForm();
});

getCakeDataFromForm();

createCakeForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const setup = JSON.stringify(currentCakeSetup);
    document.querySelector(".cakeIDOverlay").style.display = "flex";
    const result = await (await fetch("/api/createCake", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: setup,
    })).json();
    if (result.code === 200) {
        document.querySelector(".cakeIDOverlayWindow").style.display = "block";
        document.querySelector("#cakeID").innerText = result.data._id;
    }
})