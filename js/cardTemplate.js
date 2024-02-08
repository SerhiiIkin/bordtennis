function cardTemplate(spiller, index) {
    return `<li data-index="${index}" class="gallery__card card">
                <img class="card__image" src="${spiller.billede}" alt="${spiller.navn}" />
                <h2 class="card__name">${spiller.navn}</h2>
                <p>${spiller.nationalitet}</p>
                <p>Verdensrang: <span>${spiller.rang}</span></p>
                <p><span>${spiller.alder}</span> år</p>
                <p><span>${spiller.højde}</span> høj</p>
                <p><span>${spiller.vaegt}</span> vægt</p>
                <p contenteditable="true" spellcheck="false" class="card__beskrivelse"></p>
            </li>`;
}

export default cardTemplate;
