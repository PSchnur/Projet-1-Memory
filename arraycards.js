/* Tableau d'images */

// const backCard = "urlbackcard"; ? 

const donutUrls = [ 
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


/*  Affichage du tableau en générant de l'HTML - A revoir  */

function displayCard(card) {
  const cardDiv = document.createElement("div");
  cardDiv.innerHTML =`
    <p>${card.name}</p>
    <img src="${card.url}" />
  `;
  document.getElementById("card-container").appendChild(cardDiv);
};



/* Démarrage du jeu - point de départ du programme */ 
const cardArray = createArray(6, donutUrls);

shuffle(cardArray);

cardArray.forEach(displayCard);
