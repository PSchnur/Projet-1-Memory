//création variable pour stocker le score 
//création d'une variable pour accueilir la dataset
//rattacher la variable cards à la div cardList dans l'HTML


let emptyCard= null;
/*let cards=document.querySelectorAll("#card-container div") */

let score= document.querySelector(".score-container");



/* Variable flip */
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard = true;
  let secondCard = true;

/* Tableau d'images */
  const backCardUrl = "https://i.pinimg.com/originals/61/f9/62/61f962ee16a7b537efa701d3863ee1fc.jpg";

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

    function playTurn () {
      console.log(emptyCard);
      if(emptyCard === null) {
          emptyCard = firstCard.dataset.name;
          firstCard.removeEventListener("click", playTurn);

    } else if (emptyCard === secondCard.dataset.name) {
        score.value = parseInt(score.value) + 75;
        console.log(score);
        emptyCard = null;
        
        secondCard.removeEventListener("click", playTurn);
        
    } else {


        score.value -= 25;
        console.log(score);
        emptyCard = null;
        
        firstCard.addEventListener("click", playTurn);     

    }
    if (score.value - 25 < 0) {
      score.value = 0;
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
      secondCard.removeEventListener("click", flipCard); // elles restent retournées et ne peuvent plus être sélectionnées
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

  /* function finishGame() {
      if(nbrPaires >= 6) {
      alert("Bien joué !!");
      }
  } */

  /* Démarrage du jeu - point de départ du programme */ 
    const cardArray = createArray(6, frontCardUrls);

    shuffle(cardArray);

    cardArray.forEach(displayCard);

    // finishGame();

   // --------------------------------------------------- //

   var Konami = function (callback) {
    var konami = {
        addEvent: function (obj, type, fn, ref_obj) {
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                // IE
                obj["e" + type + fn] = fn;
                obj[type + fn] = function () {
                    obj["e" + type + fn](window.event, ref_obj);
                }
                obj.attachEvent("on" + type, obj[type + fn]);
            }
        },
        removeEvent: function (obj, eventName, eventCallback) {
            if (obj.removeEventListener) {
                obj.removeEventListener(eventName, eventCallback);
            } else if (obj.attachEvent) {
                obj.detachEvent(eventName);
            }
        },
        input: "",
        pattern: "38384040373937396665",
        keydownHandler: function (e, ref_obj) {
            if (ref_obj) {
                konami = ref_obj;
            } // IE
            konami.input += e ? e.keyCode : event.keyCode;
            if (konami.input.length > konami.pattern.length) {
                konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
            }
            if (konami.input === konami.pattern) {
                konami.code(konami._currentLink);
                konami.input = '';
                e.preventDefault();
                return false;
            }
        },
        load: function (link) {
            this._currentLink = link;
            this.addEvent(document, "keydown", this.keydownHandler, this);
            this.iphone.load(link);
        },
        unload: function () {
            this.removeEvent(document, 'keydown', this.keydownHandler);
            this.iphone.unload();
        },
        code: function (link) {
            window.location = link
        },
        iphone: {
            start_x: 0,
            start_y: 0,
            stop_x: 0,
            stop_y: 0,
            tap: false,
            capture: false,
            orig_keys: "",
            keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
            input: [],
            code: function (link) {
                konami.code(link);
            },
            touchmoveHandler: function (e) {
                if (e.touches.length === 1 && konami.iphone.capture === true) {
                    var touch = e.touches[0];
                    konami.iphone.stop_x = touch.pageX;
                    konami.iphone.stop_y = touch.pageY;
                    konami.iphone.tap = false;
                    konami.iphone.capture = false;
                    konami.iphone.check_direction();
                }
            },
            touchendHandler: function () {
                konami.iphone.input.push(konami.iphone.check_direction());
                
                if (konami.iphone.input.length > konami.iphone.keys.length) konami.iphone.input.shift();
                
                if (konami.iphone.input.length === konami.iphone.keys.length) {
                    var match = true;
                    for (var i = 0; i < konami.iphone.keys.length; i++) {
                        if (konami.iphone.input[i] !== konami.iphone.keys[i]) {
                            match = false;
                        }
                    }
                    if (match) {
                        konami.iphone.code(konami._currentLink);
                    }
                }
            },
            touchstartHandler: function (e) {
                konami.iphone.start_x = e.changedTouches[0].pageX;
                konami.iphone.start_y = e.changedTouches[0].pageY;
                konami.iphone.tap = true;
                konami.iphone.capture = true;
            },
            load: function (link) {
                this.orig_keys = this.keys;
                konami.addEvent(document, "touchmove", this.touchmoveHandler);
                konami.addEvent(document, "touchend", this.touchendHandler, false);
                konami.addEvent(document, "touchstart", this.touchstartHandler);
            },
            unload: function () {
                konami.removeEvent(document, 'touchmove', this.touchmoveHandler);
                konami.removeEvent(document, 'touchend', this.touchendHandler);
                konami.removeEvent(document, 'touchstart', this.touchstartHandler);
            },
            check_direction: function () {
                x_magnitude = Math.abs(this.start_x - this.stop_x);
                y_magnitude = Math.abs(this.start_y - this.stop_y);
                x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
                y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
                result = (x_magnitude > y_magnitude) ? x : y;
                result = (this.tap === true) ? "TAP" : result;
                return result;
            }
        }
    }

    typeof callback === "string" && konami.load(callback);
    if (typeof callback === "function") {
        konami.code = callback;
        konami.load();
    }

    return konami;
};


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Konami;
} else {
        if (typeof define === 'function' && define.amd) {
                define([], function() {
                        return Konami;
                });
        } else {
                window.Konami = Konami;
        }
}

var easter_egg = new Konami(function() { 
  document.location.href="./konami.html"; 
});