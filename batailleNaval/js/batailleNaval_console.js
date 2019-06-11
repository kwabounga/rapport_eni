console.log('Bataille Navale');

const TAILLE = 5;
const CARA_BOAT = '¤';
const CARA_PLOUF = '~';
const CARA_WATER = '?';

var plateauJeu = [];
var placementX;
var placementY;

var choixX;
var choixY;
var win = false;
var action = 0;

function initGame () {
  for (var i = 0; i < TAILLE; i++) {
    var t = [];
    plateauJeu.push(t);
    for (var j = 0; j < TAILLE; j++) {
      plateauJeu[i].push(CARA_WATER);
    }
  }

  placementX = Math.floor(Math.random() * TAILLE);
  placementY = Math.floor(Math.random() * TAILLE);
  plateauJeu[placementY][placementX] = CARA_BOAT;
}

function triche () {
  console.log("colonne : placementX:", placementX+1);
  console.log("colonne : placementY:", placementY+1);
}

function showBoard (occulted = true) {
  console.clear();
  var txt = '\n'

  for (var i = 0; i < plateauJeu.length; i++) {
    for (var j = 0; j < plateauJeu[i].length; j++) {

      if (plateauJeu[i][j] == CARA_BOAT) {
        if (occulted) {
          txt += CARA_WATER;
        } else {
          txt += plateauJeu[i][j]
        }
      }else{
        txt += plateauJeu[i][j];
      }
    }
    txt += '\n';
  }
  console.log(txt);
}

function gameLoop () {
  var isWinning = false;
  choixX = prompt('Choisissez la colonne entre 1 et ' + TAILLE)-1;
  if (choixX == undefined) {
    choixX = -1
  }
  choixY = prompt('Choisissez la rangée entre 1 et ' + TAILLE)-1;
  if (choixY == undefined) {
    choixY = -1
  }
  action++;
  if (choixX < TAILLE && choixY < TAILLE && choixX >= 0 && choixY >= 0) {
    if ((choixX == placementX) && (choixY == placementY)) {
      showBoard(false)
      console.log('[BOOM BADABOUM BIM BOUM]');
      console.log('Vous avez réussi en ', action, ' coups');
      isWinning = true;
    }else{
      plateauJeu[choixY][choixX] = CARA_PLOUF;
      showBoard(true);
      console.log('[PLOUF] dans l\'eau...');
    }
  } else {
    console.log('vous avez tiré à coté du plateau de jeu');
  }
  return isWinning;
}

function game () {
  showBoard(true);
  do {
    // demande utilisateur
    win = gameLoop();
  } while (!win);
}
initGame();
game();
