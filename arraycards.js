//création variable pour stocker le score 
//création d'une variable pour accueilir la dataset
//rattacher la variable cards à la div cardList dans l'HTML


let emptyCard= null;
/*let cards=document.querySelectorAll("#card-container div") */

let score = document.querySelector(".score-container");




/* Variable flip */
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard = null;
  let secondCard = true;

/* Tableau d'images */
  const backCardUrl = "./images/backcard.jpg";

  const frontCardUrls = [ 
    './images/donuts/2-14.jpg',
    './images/donuts/16-01.jpg',
    './images/donuts/19-08.jpg',
    './images/donuts/2228.jpg',
    './images/donuts/2452.jpg',
    './images/donuts/18961869.jpg'
  ];

 /* Génération des paires */
  function createArray(nbrPaires, cardUrls) {
    const cardArray = [];
  
    for (let i = 0; i < nbrPaires; i++) {
      // fabriquer une paire
      cardArray.push({url: cardUrls[i], name: "donut" + i});
      cardArray.push({url: cardUrls[i], name: "donut" + i});
    }
      
      
    return cardArray;
  }

  
/* Mélanger le tableau */
  function shuffle(arr) {
    var currentIndex = arr.length;
    var temporaryValue;
    var randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr
  }


  //Création d'une fonction pour le calcul des scores
  //Etape 1 : emptyCard prends la valeur de la carte sur laquelle on clique
  //Etape 2 : compare la valeur de emptyCard à celle du second clique

    function playTurn (){

      console.log(emptyCard)
      if(emptyCard === null) {
          emptyCard = firstCard.dataset.name
 
  //Si valeur du second clique === celle de emptyCard +100 points
  //réinitialise la valeur de emptyCard
  //pourquoi +++ ?

    } else if (emptyCard === secondCard.dataset.name) {
      
        score.value = parseInt(score.value) + 75;
        console.log(score.value);
        emptyCard = null;
        
        firstCard.removeEventListener("click", playTurn); // si les 2 cartes possèdent la même data,
        secondCard.removeEventListener("click", playTurn); // elles restent retournées et ne peuvent plus être sélectionnées
        
    
  // si valeur de emptyCard !== du second clique -25points
  // réinitialise la valeur de emptyCard
        
    } else {

        score.value -= 25;
        console.log(score.value);
        emptyCard = null;

       
  //Ajout d'une condition si score <= à 0 return 0

      if (score.value - 25 < 0) {
        score.value = 0;
    }  
    
  }
  };


/*  Affichage du tableau en générant de l'HTML - A revoir  */

  function displayCard(card) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.dataset.name = card.name;
    cardDiv.innerHTML =`
      <img class="front" src="${card.url}" />
      <img class="back" src="${backCardUrl}" />
    `;
    document.getElementById("card-container").appendChild(cardDiv);

    cardDiv.addEventListener("click", flipCard); // permet de sélectionner une carte et de la retourner
    cardDiv.addEventListener('click', playTurn) //Ajout de l'eventListener 'click' pour la fonction playTurn
  };


/* Fonction retournement cartes */
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
      secondCard.removeEventListener("click", flipCard);
      finishGame() // elles restent retournées et ne peuvent plus être sélectionnées
    } else {
      lockBoard = true; // 'bloque' le tableau afin qu'uniquement 2 cartes soient sélectionnées

      setTimeout(() => {
        firstCard.classList.remove("flip"); // retourne les 2 cartes si elles ne correspondent pas après 1 seconde
        secondCard.classList.remove("flip");
        firstCard = null;
        lockBoard = false; // 'débloque' le tableau
      }, 800);
    } 
  }


/* FIN DU JEU */


let totalPaires = 0

function finishGame(){
    totalPaires += 1;
    if(totalPaires >=6) {
      const playerName = prompt("Bien joué !! Merci de rentrer votre pseudo :")
      const scores = localStorage.getItem("scores");
      if (scores){
        const scoreArray = JSON.parse(scores)
        scoreArray.push({name:playerName, score:score.value})
        localStorage.setItem("scores", JSON.stringify(scoreArray))
      }else {
        localStorage.setItem("scores", JSON.stringify([{name:playerName, score:score.value}]));
      }
    }
}


/*






  /* Démarrage du jeu - point de départ du programme */ 
    const cardArray = createArray(6, frontCardUrls);

    shuffle(cardArray);

    cardArray.forEach(displayCard);

    /* finishGame();  */

    localStorage.setItem("score", score.value);
    