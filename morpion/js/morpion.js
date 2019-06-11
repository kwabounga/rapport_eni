console.log("Morpion 2.0")

const O = 'O';
const X = 'X';
const VIDE = '_';

const TAILLE = 3;

var morpion = [];
var joueurs = [O,X];
var joueurCourant = 0;

//choix utilisateur
var choixX;
var choixY;

var defaite = true;

var ligneHori = 0;
var ligneVert = 0;
var diagoHori = 0;
var diagoVert = 0;

var casesUtilises = 0
// initialisation du tableau
for (var i = 0; i < TAILLE; i++) {
  var t = [];
  morpion.push(t);
  for (var j = 0; j < TAILLE; j++) {
    morpion[i].push(VIDE);
  }
}
console.log(morpion)
showBoard();


function showBoard () {
  var txt = "\n"
  for (var i = 0; i < morpion.length; i++) {
    for (var j = 0; j < morpion[i].length; j++) {
      txt += morpion[i][j];
    }
    txt += '\n'
  }
  console.log("\n"+ txt);
}

function game () {

  do {
    console.log(" Joueur " + joueurs[joueurCourant] + " à vous :");

    choixX = prompt("Choisissez une colonne entre 1 et " + TAILLE)-1;
    choixY = prompt("Choisissez une ligne entre 1 et " + TAILLE)-1;

    if ((choixY > TAILLE-1) || (choixX > TAILLE-1) || (choixY < 0)|| (choixX < 0) || morpion[choixY][choixX] != VIDE ) {
      // on passe le tour
      // on test pas
      console.log("Case non Correcte ! vous passez votre tour ... domage !")
    } else {
       morpion[choixY][choixX] = joueurs[joueurCourant]
       casesUtilises ++;
       showBoard();
       for (var i = 0; i < TAILLE; i++) {
         if (morpion[choixY][i] == joueurs[joueurCourant]) {
            ligneVert ++;
         }
         if (morpion[i][choixX] == joueurs[joueurCourant]) {
            ligneHori ++;
         }
         if (morpion[i][i] == joueurs[joueurCourant]) {
            diagoHori ++;
         }
         if (morpion[(TAILLE-1)-i][i] == joueurs[joueurCourant]) {
            diagoVert ++;
         }
       }

       if (ligneVert == TAILLE ||ligneHori == TAILLE || diagoHori == TAILLE || diagoVert == TAILLE) {
         defaite = false;
       }else{
         ligneVert = 0;
         ligneHori = 0;
         diagoHori = 0;
         diagoVert = 0;
       }
    }

    if(defaite){
      if ((joueurCourant==0)) {
        joueurCourant =1;
      }else{
        joueurCourant =0;
      }
    }
    console.log("joueur courant: " , joueurCourant, " , casesUtilises: ", casesUtilises, " , defaite: ", defaite);
  } while (defaite && casesUtilises < 9);
  if(!defaite){
    console.log("BRAVO " +  joueurs[joueurCourant] + " vous avez gagnez !! ");
  }else{
    console.log("EGALITE");
  }
}
