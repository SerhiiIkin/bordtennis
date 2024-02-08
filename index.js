import cardTemplate from "./js/cardTemplate.js";

const gallery = document.querySelector(".gallery");
const layoutButtons = document.querySelectorAll(".header__layout-btns button");
const blackdrop = document.createElement("div");

layoutButtons.forEach((btn) => {
    btn.addEventListener("click", onLayoutBtnCLick);
});

prepRenderCards("grid");
layoutButtons[0].classList.add("active");

function onLayoutBtnCLick(e) {
    const dataValue = e.target.dataset.value;
    const button = e.target.closest("button");

    layoutButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    switch (dataValue) {
        case "grid":
            prepRenderCards("grid");
            break;

        case "list":
            prepRenderCards("list");
            break;
    }
}

async function fetchData() {
    const response = await fetch("./bordtennisspiller.json");
    const data = await response.json();
    return data;
}

async function prepRenderCards(style) {
    const spillerData = await fetchData();
    switch (style) {
        case "grid":
            gallery.classList.remove("gallery--list");
            RenderCards(spillerData);
            break;
        case "list":
            gallery.classList.add("gallery--list");
            RenderCards(spillerData);
            break;
    }
}

function RenderCards(spillerData) {
    gallery.replaceChildren();
    spillerData.forEach((spiller, index) => {
        gallery.insertAdjacentHTML("beforeend", cardTemplate(spiller, index));
    });
    const cards = gallery.querySelectorAll(".card");
    cards.forEach((card) => {
        card.addEventListener("click", onCardClick);
    });
}

async function onCardClick(e) {
    const spillerData = await fetchData();
    const card = e.target.closest(".card");
    const isActiveCard = card.classList.contains("active");
    const sentenceElement = card.querySelector(".card__beskrivelse");
    const getspilleData = spillerData.find(
        (spiller) => spiller.id == card.dataset.index
    );
    setTimeout(() => {
        typeSentence(getspilleData.beskrivelse, sentenceElement);
    }, 2000);

    blackdrop.addEventListener("click", () => removeBlackdrop(card));
    isActiveCard ? removeBlackdrop(card) : addBlackdrop(card);
}

function removeBlackdrop(card) {
    blackdrop.remove();
    card.classList.remove("active");
}

function addBlackdrop(card) {
    blackdrop.classList.add("blackdrop");
    card.classList.add("active");
    gallery.prepend(blackdrop);
}

function typeSentence(sentence, sentenceElement, index = 0) {
    if (index === 0) {
        sentenceElement.replaceChildren();
    }

    if (index < sentence.length) {
        const char = sentence.charAt(index);
        sentenceElement.insertAdjacentHTML("beforeend", char);
        moveCursorToEnd(sentenceElement);

        setTimeout(() => {
            typeSentence(sentence, sentenceElement, index + 1);
        }, 100);
    }
}

function moveCursorToEnd(el) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    el.focus();
}
