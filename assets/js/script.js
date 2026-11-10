const grigliaProdotti = document.getElementById('griglia-prodotti');


const prodotti = [
    {
        nome: 'Sneaker Run',
        prezzo: 89,
        descrizione: 'Scarpe leggere e comode, ideali per la corsa di ogni giorno.'
    },
    {
        nome: 'T-shirt basic',
        prezzo: 19,
        descrizione: 'T-shirt in cotone morbido, perfetta da abbinare a tutto.'
    },
    {
        nome: 'Borsa city',
        prezzo: 49,
        descrizione: 'Borsa spaziosa e resistente per la vita in città.'
    }
];

const formattaPrezzo = (prezzo) => `€ ${prezzo.toFixed(2).replace('.', ',')}`;
const ordineCasuale = [...prodotti].sort(() => Math.random() - 0.5);

ordineCasuale.forEach((prodotto) => {
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
        descrizione.classList.add('card-text', 'text-muted');
        descrizione.textContent = prodotto.descrizione;

        const prezzo = document.createElement('p');
        prezzo.classList.add('fw-bold', 'fs-5', 'm-0');
        prezzo.textContent = formattaPrezzo(prodotto.prezzo);

        body.append(titolo, descrizione, prezzo);

        // footer con bottone Dettagli
        const footer = document.createElement('div');
        footer.classList.add('card-footer', 'bg-white', 'border-0');

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