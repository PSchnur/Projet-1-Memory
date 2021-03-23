/* Tableau d'images */

// const backCard = "urlbackcard"; ? 

const donutUrls = [ 
    { url: 'images/donuts/2-14.jpg'},
    { url: 'images/donuts/16-01.jpg'},
    { url: 'images/donuts/19-08.jpg'},
    { url: 'images/donuts/2228.jpg'},
    { url: 'images/donuts/2452.jpg'},
    { url: 'images/donuts/18961869.jpg'},
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


/*  Affichage du tableau en générant de l'HTML - A revoir  */

const myCardImg = document.querySelector('.card-img');

for (let i = 0; i < donutUrls.length; i += 1) {
    const myCard = document.createElement("article");
    cardImg.classList.add("card-img");
    myCardImg.appendChild(myCard);

    const myImg = document.createElement("div");
    myImg.classList.add("card-img");
    myCard.appendChild(cardImg);

}




/* Démarrage du jeu - point de départ du programme */ 
const cards = createArray(6, donutUrls);

shuffle(cards);

displayCards(cards);