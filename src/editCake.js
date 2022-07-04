import {} from "./HTMLDelegate";
import {renderCake, currentCakeSetup} from "./cakeSetup";

Array.from(document.querySelectorAll("form")).map(f => f.style.display = "none");
const editCakeForm = document.querySelector(".editCakeForm");
editCakeForm.style.display = "flex";

let directCakeCode = document.querySelector("#directCakeID").innerText.trim();

function getCakeDataFromForm() {
    for (let inputElement of editCakeForm.querySelectorAll("input, select")) {
        const property = inputElement.name;
        const value = inputElement.value;
        if (inputElement.matches("[type=color]")) {
            inputElement.style.setProperty("--currentColor", value);
        }
        currentCakeSetup[property] = value;
    }
    renderCake();
}

async function getCake(cakeID) {
    console.log(cakeID)
    const cakeJSON = await (await fetch("/api/getCake/" + cakeID)).json();
    Object.assign(currentCakeSetup, cakeJSON.data);
    renderCake();
    for (let cakeProperty of Object.keys(currentCakeSetup)) {
        let curElement = editCakeForm.querySelector(`input[name='${cakeProperty}'], select[name='${cakeProperty}']`);
        let newValue = currentCakeSetup[cakeProperty];
        if (curElement) {
            curElement.value = newValue;
        }
        if (curElement.matches("[type=color]")) {
            curElement.style.setProperty("--currentColor", newValue);
        }
    }
}
getCake(directCakeCode);


editCakeForm.delegate("change", "input, select", function () {
    getCakeDataFromForm();
});

editCakeForm.delegate("input", "input, select", function () {
    getCakeDataFromForm();
});

editCakeForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const setup = JSON.stringify({
        ...currentCakeSetup,
        _id: directCakeCode,
    });
    document.querySelector(".cakeIDOverlay").style.display = "flex";
    const result = await (await fetch("/api/editCake", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: setup,
    })).json();
    if (result.code === 200) {
        location.reload();
    }
})

const deleteButton = document.querySelector(".editCakeForm .delete");
deleteButton.addEventListener("click", async function (e) {
    e.preventDefault();
    const json = await (await fetch("/api/deleteCake", {
        method: "DELETE",
        body: JSON.stringify({
            cakeID: directCakeCode,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })).json();
    if (json.code === 200) {
        location.replace("/createCake");
    }
})