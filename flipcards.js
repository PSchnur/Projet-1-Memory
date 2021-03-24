const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard = true;
let secondCard = true;

function flipCard() {
  if (lockBoard) return; // oblige à sélectionner uniquement 2 cartes
  if (this === firstCard) return; // empêche le double-clique d'une carte

  this.classList.add("flip"); // ajoute la classe 'flip' à toutes les cartes

  if (!hasFlippedCard) {
    // premier clique/première carte
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second clique/seconde carte
  hasFlippedCard = false;
  secondCard = this;

  if (firstCard.dataset.name === secondCard.dataset.name) {
    firstCard.removeEventListener("click", flipCard); // si les 2 cartes possèdent la même data,
    secondCard.removeEventListener("click", flipCard); // elles restent retournées et ne peuvent plus être sélectionnées
  } else {
    lockBoard = true; // 'bloque' le tableau afin qu'uniquement 2 cartes soient sélectionnées

    setTimeout(() => {
      firstCard.classList.remove("flip"); // retourne les 2 cartes si elles ne correspondent pas après 1 seconde
      secondCard.classList.remove("flip");

      lockBoard = false; // 'débloque' le tableau
    }, 1000);
  }
}

cards.forEach((card) => card.addEventListener("click", flipCard)); // permet de sélectionner une carte et de la retourner
