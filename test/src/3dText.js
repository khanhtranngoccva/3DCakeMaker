function apply3DText(parent) {
    let text = parent.getAttribute("text");
    const firstTextElement = document.createElement("p");
    firstTextElement.classList.add("front3DText");
    firstTextElement.innerText = text;
    parent.append(firstTextElement);
    for (let i = 1; i < 20; i++) {
        const textElement = document.createElement("p");
        textElement.classList.add("side3DText");
        textElement.innerText = text;
        textElement.style.transform = `translateZ(${-i}px)`;
        parent.append(textElement);
    }
}

function applyCandleText(parent) {
    parent.innerHTML = "";
    let text = parent.getAttribute("text");
    for (let char of text) {
        const outerTextElement = document.createElement("div");
        outerTextElement.classList.add("candleChar");
        parent.append(outerTextElement);
        const frontTextElement = document.createElement("div");
        frontTextElement.innerText = char;
        frontTextElement.classList.add("frontCandleChar");
        if ("108".includes(char)) {
            frontTextElement.style.transform = "scaleX(1.4)";
        }
        outerTextElement.append(frontTextElement);

        for (let i = 1; i < 20; i++) {
            const textElement = document.createElement("div");
            textElement.classList.add("sideCandleChar");
            textElement.innerText = char;
            textElement.style.transform = `translateZ(${-i}px)`;
            frontTextElement.append(textElement);
        }
        const fire = `<div class="flame">
            <div class="flameTransformGroup">
                <div class="flamePart1 reusableBox"></div>
                <div class="flamePart2 reusableBox"></div>
                <div class="flamePeak reusableBox"></div>    
            </div>
        </div>`
        outerTextElement.innerHTML += fire;
    }
}

function renderCandles() {
    Array.from(document.querySelectorAll(".candleText")).map(e => applyCandleText(e));
}

export {renderCandles};