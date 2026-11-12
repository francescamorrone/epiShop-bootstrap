const grigliaProdotti = document.getElementById('griglia-prodotti');
const toggle = document.getElementById("toggle-tema");
const filtri = document.getElementById("filtri");


// === Dati ===

const prodotti = [
    {
        id: 1, nome: "Sneaker Run", prezzo: 89, categoria: "scarpe",
        descrizione: "Scarpa leggera per la corsa, suola in gomma traspirante.",
        img: "https://placehold.co/300x180"
    },
    {
        id: 2, nome: "T-shirt basic", prezzo: 19, categoria: "abbigliamento",
        descrizione: "Cotone biologico, taglio regolare, disponibile in 5 colori.",
        img: "https://placehold.co/300x180"
    },
    {
        id: 3, nome: "Borsa city", prezzo: 49, categoria: "accessori",
        descrizione: "Tessuto resistente, tasca interna, cinghia regolabile.",
        img: "https://placehold.co/300x180"
    },
    {
        id: 4, nome: "Sandali estate", prezzo: 39, categoria: "scarpe",
        descrizione: "Plantare anatomico, pelle vegana, perfetti per l'estate.",
        img: "https://placehold.co/300x180"
    },
    {
        id: 5, nome: "Felpa con cappuccio", prezzo: 59, categoria: "abbigliamento",
        descrizione: "Tessuto morbido, tasca a marsupio, polsini elasticizzati.",
        img: "https://placehold.co/300x180"
    },
    {
        id: 6, nome: "Cappello sport", prezzo: 14, categoria: "accessori",
        descrizione: "Visiera regolabile, traspirante, ideale per gli allenamenti.",
        img: "https://placehold.co/300x180"
    },
];

const formattaPrezzo = (prezzo) => `€ ${prezzo.toFixed(2).replace('.', ',')}`;
const ordineCasuale = [...prodotti].sort(() => Math.random() - 0.5);

function render(prodottiDaMostrare) {

    grigliaProdotti.textContent = '';

    prodottiDaMostrare.forEach((prodotto) => {
        // colonna
        const colonna = document.createElement('article');
        colonna.classList.add('col-12', 'col-sm-6', 'col-xl-4', 'col-xxl-3', 'mb-3');

        // card
        const card = document.createElement('div');
        card.classList.add('card', 'h-100', 'shadow-sm');

        // immagine
        const img = document.createElement('img');
        img.src = 'https://placehold.co/300x180';
        img.alt = prodotto.nome;
        img.classList.add('card-img-top');

        // body
        const body = document.createElement('div');
        body.classList.add('card-body');

        const titolo = document.createElement('h5');
        titolo.classList.add('card-title');
        titolo.textContent = prodotto.nome;

        const descrizione = document.createElement('p');
        descrizione.classList.add('card-text');
        descrizione.textContent = prodotto.descrizione;

        const prezzo = document.createElement('p');
        prezzo.classList.add('fw-bold', 'fs-5', 'm-0');
        prezzo.textContent = formattaPrezzo(prodotto.prezzo);

        body.append(titolo, descrizione, prezzo);

        // footer con bottone Dettagli
        const footer = document.createElement('div');
        footer.classList.add('card-footer', 'border-0');

        const bottone = document.createElement('button');
        bottone.type = 'button';
        bottone.classList.add('btn', 'btn-primary', 'w-100');
        bottone.setAttribute('data-bs-toggle', 'modal');
        bottone.setAttribute('data-bs-target', '#scheda-prodotto');
        bottone.textContent = 'Dettagli';

        // modal
        bottone.addEventListener('click', () => {
            document.getElementById('modal-titolo').textContent = prodotto.nome;
            document.getElementById('modal-immagine').alt = prodotto.nome;
            document.getElementById('modal-descrizione').textContent = prodotto.descrizione;
            document.getElementById('modal-prezzo').textContent = formattaPrezzo(prodotto.prezzo);
        });

        footer.append(bottone);

        card.append(img, body, footer);
        colonna.append(card);
        grigliaProdotti.append(colonna);
    });
}

render(ordineCasuale);

//dark mode
toggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    toggle.textContent = isDark ? "Tema chiaro" : "Tema scuro";
});

// === Filtro per categoria con event delegation ===

filtri.addEventListener("click", function (event) {
    const bottone = event.target.closest("[data-categoria]");
    if (!bottone) return;

    const tuttiIBottoni = filtri.querySelectorAll(".btn");

    tuttiIBottoni.forEach((b) => b.classList.remove("active"));

    // aggiungo active solo al bottone appena cliccato
    bottone.classList.add("active");

    const categoria = bottone.dataset.categoria;

    let prodottiFiltrati = [];


    if (categoria === "tutti") {
        prodottiFiltrati = prodotti;
    } else {
        prodottiFiltrati = prodotti.filter(function (singoloProdotto) {
            if (singoloProdotto.categoria === categoria) {
                return true; 
            } else {
                return false;
            }
        });
    }
    render(prodottiFiltrati);
});