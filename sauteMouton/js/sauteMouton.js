console.log('Jeu du saute moutons:');

const TAILLE = 7;
const MOUTON_DROITE = '<';
const MOUTON_GAUCHE = '>';
const VIDE = '_';

function afficheTableau (tb) {
  console.clear();
  var txt = '';
  for (var i = 0; i < tb.length; i++) {
    txt += tb[i];
    if (i != tb.length - 1) {
      txt += '|';
    }
  }
  console.log(txt);
}
// initialise le 'plateau' de jeu, les moutons , la case vide
function initialisationDuJeu () {
  var ar = [];
  for (var i = 0; i < TAILLE; i++) {
    if (i < Math.floor(TAILLE / 2)) {
      ar.push(MOUTON_GAUCHE);
    } else if (i > Math.floor(TAILLE / 2)) {
      ar.push(MOUTON_DROITE);
    } else {
      ar.push(VIDE);
    }
  }
  return ar;
}
// Utilisé pour récuperer le type de mouton par rapport à la direction
function getMouton (dir) {
  var mouton = MOUTON_GAUCHE;
  if (dir == -1) {
    mouton = MOUTON_DROITE;
  }
  return mouton;
}
// Utilisé pour Obtenir la direction par rapport au type de moutons
function getDirection (mouton) {
  var dir = 1;
  if (mouton == MOUTON_DROITE) {
    dir = -1;
  }
  return dir;
}

// vérifie si on a gagné
function verification (tb) {
  var win = true;
  var i = 0;
  while (win && i < 3) {
    win = tb[i] == MOUTON_DROITE;
    i++;
  }
  win = win && tb[3] == VIDE;
  return win;
}
function noMoreTry (plateau) {
  var nmt = true;
  var direction;
  for (var i = 0; i < plateau.length; i++) {
    direction = getDirection(plateau[i]);
    // on test si la case a tester existe et si elle est vide
    if (plateau[i + direction] == VIDE && i + direction >= 0 && i + direction < TAILLE) {
      // on peux encore bouger
      nmt = false;
      // console.log('on peut bouger ' + i);
      // sinon on test si la case  d'apres  existe,si elle est vide et si le mouton à sauter n'est pas de la même famille ca ferait désordre
    } else if (plateau[i + (direction * 2)] == VIDE && plateau[i + direction] != plateau[i] && i + (direction * 2) >= 0 && i + (direction * 2) < TAILLE) {
      // on peu encore sauter
      nmt = false;
      // console.log('on peut bouger ' + i);
    } else {
      // déplacement impossible
    }
  }
  return nmt;
}
// fonction pour updater le dom rapidment avec les indexs de moutons
function afficherMoutonDansDom (moutonAAfficher, idMoutonAAfficher, idMoutonAEffacer) {
  // transforme la direction en index pour recuperer la class css approprié
  moutonAAfficher = (moutonAAfficher == 1)
    ? 1
    : 0;
  // recuperation dans le dom  de la div contenant les div moutons
  var plateau = document.getElementsByClassName('cell');
  // definition des class css mouton gauche et droite
  var moutonClass = ['sheep-d', 'sheep-g'];
  // on swap le vide et le mouton
  plateau[idMoutonAAfficher].className = 'cell ' + moutonClass[moutonAAfficher];
  plateau[idMoutonAEffacer].className = 'cell empty';
}

// joue une animation 3d dolby digital quand on a gagné ou quand on a perdu
function gameOverAnimation (win = true) {
  var animClass =  win ?   "anim-win" : "anim-loose";
  var plateau = document.getElementsByClassName('cell');
  for (var i = 0; i < plateau.length; i++) {
    plateau[i].className = plateau[i].className + ' ' + animClass;
  }
}
// la function de jeu principal
function gameLoop (plateau) {
  var moutonCourant;
  var win = false;
  var direction;
  // affiche dans la console
  afficheTableau(plateau);
  // récuperation de la saisie utilisateur
  moutonCourant = prompt('Veuillez choisir un mouton à déplacer') - 1;
  // test et déplacemnts
  if (moutonCourant >= 0 && moutonCourant < TAILLE && plateau[moutonCourant] != VIDE) {
    // ici la saisie utilisateur est bonne
    direction = getDirection(plateau[moutonCourant]);
    // test si la case d'apres existe et si elle est libre
    if (plateau[moutonCourant + direction] == VIDE && moutonCourant + direction >= 0 && moutonCourant + direction < TAILLE) {
      // on bouge
      plateau[moutonCourant + direction] = getMouton(direction);
      plateau[moutonCourant] = VIDE;
      // on actualise le dom
      afficherMoutonDansDom(direction, moutonCourant + direction, moutonCourant);
      // on vérifie si on a gagné
      win = verification(plateau);

    } else if (plateau[moutonCourant + (direction * 2)] == VIDE && plateau[moutonCourant + direction] != plateau[moutonCourant] && moutonCourant + (direction * 2) >= 0 && moutonCourant + (direction * 2) < TAILLE) {
      // on saute
      plateau[moutonCourant + (direction * 2)] = getMouton(direction);
      plateau[moutonCourant] = VIDE;
      // on actualise le dom
      afficherMoutonDansDom(direction, moutonCourant + (direction * 2), moutonCourant);
      // on vérifie si on a gagné
      win = verification(plateau);
    } else {
      // déplacement impossible
    }
  } else {
    // on est hors du plateau de jeu
  }
  return win;
}

// constructor
function game () {
  var win;
  var haveNoMoreTry;
  var tableau = [];
  tableau = initialisationDuJeu();

  console.log(tableau);
  afficheTableau(tableau);

  do {
    win = gameLoop(tableau);
    haveNoMoreTry = noMoreTry(tableau);
  } while (!win && !haveNoMoreTry);

  afficheTableau(tableau);
  if (win) {
    console.log('Vous avez gagnez');
  } else {
    console.log('Vous avez perdu');
  }
  gameOverAnimation(win);
}

game();
