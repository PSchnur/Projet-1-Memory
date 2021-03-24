//création variable pour stocker le score 
//création d'une variable pour accueilir la dataset
//rattacher la variable cards à la div cardList dans l'HTML


let emptyCard= null;
let cards=document.querySelectorAll("#cardList div")

//création d'une boucle for pour parcourir cards
//Ajout de l'eventListener 'click' pour la fonction playTurn

for (let i = 0 ; i<cards.length; i +=1){
    const card = cards[i]
    card.addEventListener('click', playTurn) 

}
 //rattacher firstCard à la div cardOne
 //rattacher secondCard à la div cardTwo

let firstCard = document.querySelector(".cardOne");
let secondCard = document.querySelector(".cardTwo");
let score= document.querySelector(".score-container");
//Création d'une fonction pour le calcul des scores
//Etape 1 : emptyCard prends la valeur de la carte sur laquelle on clique
//Etape 2 : compare la valeur de emptyCard à celle du second clique

function playTurn (event){
    console.log(event.target.dataset.id)
    console.log(emptyCard)
    if(emptyCard === null){
        emptyCard = event.target.dataset.id

//Si valeur du second clique === celle de emptyCard +100 points
//réinitialise la valeur de emptyCard
//pourquoi +++ ?


    } else if (emptyCard === event.target.dataset.id) {
        score.value = score.value +++ 75;
        console.log(score)
        emptyCard = null

// si valeur de emptyCard !== du second clique -25points
// réinitialise la valeur de emptyCard
        
    } else { (emptyCard !== event.target.dataset.id)
    score.value =  score.value --- 25 ;
    console.log(score);
    emptyCard = null;

//Ajout d'une condition si score <= à 0 return 0

    if (score.value - 25 < 0) {
    score.value = 0;
  }
}
};


    
