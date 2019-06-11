function start() {
  console.log("Ecrire des blocs!")

  var cara = prompt('cara?')
  var taille = prompt('taille?')
  var txt = ''

  console.log(" Veuillez maintenant indique le motif que vous voulez afficher :")
  console.log("1 -  rectangle plein")
  console.log("2 -  rectangle creux")
  console.log("3 -  croix de Saint-André")
  console.log("4 -  triangle")
  console.log("5 -  losange")
  console.log("6 -  damier")
  console.log("7 -  rayé horizontal")
  console.log("8 -  rayé vertical")
  console.log("9 -  hashtag like")
  console.log("10 -  rond?")
  console.log("-1 - EXIT")
  var motif = prompt('motif?')
  while (motif != '-1') {


    switch (motif) {
      case '1':
        for (var i = 0; i < taille; i++) {
          for (var j = 0; j < taille; j++) {
            txt += cara
          }
          txt += '\n'
        }
        break;
      case '2':
        for (var i = 0; i < taille; i++) {
          for (var j = 0; j < taille; j++) {
            if (i == 0 || j == 0 || i == taille - 1 || j == taille - 1) {
              txt += cara
            } else {
              txt += ' '
            }
          }
          txt += '\n'
        }
        break;
      case '3':
        for (var i = 0; i < taille; i++) {
          for (var j = 0; j < taille; j++) {
            if (i == j || (j + i) == taille - 1) {
              txt += cara
            } else {
              txt += ' '
            }
          }
          txt += '\n'
        }

        break;
      case '4':
        for (var i = 0; i < taille; i++) {
          for (var j = 0; j < taille; j++) {
            //j = 1 ou j = i ou i = choixTaille
            if (j == 0 || j == i || i == taille - 1) {
              txt += cara
            } else {
              txt += ' '
            }
          }
          txt += '\n'
        }
        break;
        //i+j-2=taille div 2 ou i+j-2=3*(taille div 2) ou i-j=taille div 2 ou j-i=taille div 2

      case '5':
        for (var i = 0; i < taille; i++) {
          for (var j = 0; j < taille; j++) {
            if ((i) + j  == Math.floor((taille - 1) / 2) || (i + j)  == 3 * Math.floor((taille - 1) / 2) || i - j == Math.floor((taille - 1) / 2) || j - i == Math.floor((taille - 1) / 2)) {
              txt += cara
            } else {
              txt += ' '
            }
          }
          txt += '\n'
        }
        break;
      case '6':
        var boo = true
        for (var i = 0; i < taille; i++) {
          for (var j = 0; j < taille; j++) {
            if (boo) {
              txt += cara
            } else {
              txt += ' '
            }
            boo = !boo
          }
          txt += '\n'
        }
        break;
      case '7': //rayé
        var boo = true
        for (var i = 0; i < taille; i++) {
          for (var j = 0; j < taille; j++) {
            if (i % 2 == 0) {
              txt += cara
            } else {
              txt += ' '
            }
            boo = !boo
          }
          txt += '\n'
        }
        break;
      case '8': //rayé
        var boo = true
        for (var i = 0; i < taille; i++) {
          for (var j = 0; j < taille; j++) {
            if (j % 2 == 0) {
              txt += cara
            } else {
              txt += ' '
            }
            boo = !boo
          }
          txt += '\n'
        }
        break;
      case '9': //bariolé
        var boo = true
        for (var i = 0; i < taille; i++) {
          for (var j = 0; j < taille; j++) {
            if (j % 2 != 0 || i % 2 !=0) {
              txt += cara
            } else {
              txt += ' '
            }
            boo = !boo
          }
          txt += '\n'
        }
        break;
      case '10': //rond?
        var boo = true
        for (var i = 0; i < taille; i++) {
          for (var j = 0; j < taille; j++) {
            if (i<(taille/2) &&j == (taille/2)-i  || i<=(taille/2) && j == (taille/2)+(i+1)) {
              txt += cara
            } else {
              txt += ' '
            }
            boo = !boo
          }
          txt += '\n'
        }
        break;
      default:
        console.log("oups")
    }
    console.log(txt)
    console.log("\n")
    txt = ''
    motif = prompt('motif?')
  }

}
