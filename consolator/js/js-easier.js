/**
* "JSEASY Helpers methods for easy coding"
* @author: Jean-Yves Chaillou
* @version: 0.0.1
* @since: 02.02.19
* @see: https://github.com/JSEASYbounga
* @type: GLOBAL OBJECT
*
* @contact: jeanyves.chaillou[at]gmail.com
* @usage: use JSEASY package to access to your favorite helper like JSEASY.trace('yourlog')
*/


/**
* @constructor  : Activating Global Object
*/
var JSEASY = JSEASY || {};

/**
 * Convert a string in ascii code
 * @param  {String} - the String to convert
 * @return  {String} - the Converted String
 */
JSEASY.codeAsciiConvertor = function ( strg ) {
  var ar = strg.split( '' );
  console.log( 'ar:', ar );
  var txt = '';
  for ( var i = 0; i < ar.length; i++ ) {
    txt += strg.charCodeAt( i );
    if ( i != ar.length - 1 ) txt += '.';
  }
  return txt;
}


/**
 * Crypto encoding cypher
 * @param {String} - the text to encode
 * @param {Array} - the transpose Numbers [4,2,6]
 * @return {Type} - the encoded text
 */
JSEASY.cryptoCipherizerEncrypt = function ( txt, transpo = [ 4, 2 ] ) {

  var ArAlph = JSEASY.textHelpers._alphabetshuff.split( '' );
  var ArTxt = txt.split( '' );
  var txtCrypted = '';
  var nbChara = ArAlph.length;

  var switchAr = 0;

  var arrTranspo;
  if ( Array.isArray( transpo ) ) {
    arrTranspo = transpo;
  } else {
    switch ( typeof transpo ) {
      case "string":
        arrTranspo = transpo.split( '' );
        break;
      case "number":
        arrTranspo = transpo.toString().split( '' );
        break;
      default:
        arrTranspo = [ 4, 2 ];
    }
  }
  // console.log(Array.isArray(arrTranspo));
  // console.table( arrTranspo );

  for ( var i = 0; i < ArTxt.length; i++ ) {
    var chara = ArTxt[ i ];
    // console.log(i, "ArTxt[i]", ArTxt[i])
    var pos = ArAlph.indexOf( chara );
    // console.log(i, "pos", pos)
    pos += parseInt( arrTranspo[ switchAr ] );
    // console.log(i, "parseInt( arrTranspo[ switchAr ] ); ",parseInt( arrTranspo[ switchAr ] ) );
    if ( pos >= nbChara ) pos -= nbChara;
    // console.log(i, "next pos",pos)
    txtCrypted += ArAlph[ pos ] + '';

    switchAr++;
    if ( switchAr == arrTranspo.length - 1 ) {
      switchAr = 0;
    }

  }

  return txtCrypted;

}

/**
 * Crypto decoding cypher reversed
 * @param {String} - the text to encode
 * @param {Array} - the transpose Numbers [4,2,6] // the same combinaison of numbers used to encode the txt
 * @return {Type} - the decoded text
 */
JSEASY.cryptoCipherizerDecrypt = function ( txt, transpo = [ 4, 2 ] ) {

  var ArAlph = JSEASY.textHelpers._alphabetshuff.split( '' );
  var ArTxt = txt.split( '' );
  var txtDecrypted = '';
  var nbChara = ArAlph.length;
  var switchAr = 0;

  var arrTranspo;
  if ( Array.isArray( transpo ) ) {
    arrTranspo = transpo;
  } else {
    switch ( typeof transpo ) {
      case "string":
        arrTranspo = transpo.split( '' );
        break;
      case "number":
        arrTranspo = transpo.toString().split( '' );

        break;
      default:
        arrTranspo = [ 4, 2 ];
    }
  }
  // console.table( arrTranspo );

  for ( var i = 0; i < ArTxt.length; i++ ) {
    var chara = ArTxt[ i ];
    var pos = ArAlph.indexOf( chara );

    pos -= parseInt( arrTranspo[ switchAr ] );
    // console.log(parseInt( arrTranspo[ switchAr ] ));
    if ( pos <= 0 ) pos += nbChara;

    txtDecrypted += ArAlph[ pos ] + '';

    switchAr++;
    if ( switchAr == arrTranspo.length - 1 ) {
      switchAr = 0;
    }
  }

  return txtDecrypted;
}

/**
 * Tools to formating text with a nb of chara %2==0
 * @param {String} - the text to format
 * @return {String} - the formated text
 */
JSEASY.formatText = function ( txt ) {
  if ( txt.length % 2 != 0 ) txt += ' ';
  return txt;
}

/**
 * Generator Function to give a uniq id
 * @param {String} - label
 * @return {String} - the String ID : Label+id
 * @example - var myID = JSEASY.giveID('label'); every myId.next() // return "label0" to "label999";
 */
JSEASY.giveID = function* ( name ) {
  var i = 0;
  for ( var i = 0; i < 1000; i++ ) {
    let textId = name + i;
    yield textId;
  }
  return "end_" + name + "more than 1000 id please reinitialize gen. function";
}

/**
 * the customized log function
 * @param {rest} - what do you want to log
 * @description - log anything : using console.dir ; console.table ; or console.log
 * @optional - a div named "output" in the html to log whithout console;
 * @example - JSEASY.trace('anything you want', ["to","log"]);
 */
JSEASY.trace = function ( ...logs ) {
  // TODO: faire un css embarqué pour la div output;
  JSEASY.logId = JSEASY.logId || JSEASY.giveID( "log" );
  // console.log( "// JSEASY.trace %cbegin", "color: green; font-style: bold; background-color: black; padding: 2px" );
  if ( logs.length > 1 ) console.groupCollapsed( JSEASY.logId.next().value );
  for ( var i = 0; i < logs.length; i++ ) {
    if ( Array.isArray( logs[ i ] ) ) {

      console.table( logs[ i ] );
      console.dir( logs[ i ] );

    } else if ( typeof logs[ i ] == 'string' || typeof logs[ i ] == 'number' ) {

      console.log( logs[ i ] );

    } else {

      console.log( logs[ i ] );
      console.dir( logs[ i ] );

    }

  }
  var otpt = document.getElementById( 'output' );
  if ( otpt != null ) {
    otpt.style.color = 'white';
    otpt.style.backgroundColor = 'black';
    otpt.style.fontFamily = "Courier,Charcoal,sans-serif";
    for ( var i = 0; i < logs.length; i++ ) {
      otpt.appendChild( document.createTextNode( logs[ i ] ) );
      otpt.appendChild( document.createTextNode( "\n" ) );
    }
  }
  if ( logs.length > 1 ) console.groupEnd();
  // console.log( "// JSEASY.trace %cEND", "color: red; font-style: bold; background-color: black; padding: 2px" );
}

/**
 * Object textHelpers collection
 * @function JSEASY.textHelpers.blank(int) - generate a string whith n blank - @return {string}
 * @function JSEASY.textHelpers.logo() - generate a string whith JSEASY logo - @return {string}
 * @function JSEASY.textHelpers.copyright(String) - generate a nfo file with the name of the app - @return {string}
 */
JSEASY.textHelpers = {
  _alphabet: 'ABCMqrstEFGHUV_ç567uvwcdeQRfgD89- !:/;JKLhijklmn.,?*ù$^NOPxyIop><&é"\'(-è34STz012WXYZabà)=',
  _alphabetshuff: "'Wu-0L:nù<qXH ?F;dKl_t$EOA&Gz7jpZàm3r-8YIgyhRak^,JBx>.s*v=6eU)çD!b1Q5(4TCéiS2/oMfNVc9wPè",
  _linegap: "\n",
  _space: " ",
  _spaceline: "        ",
  _star: "*",
  _starline: "**********",
  _dollar: "$",
  _dollarline: "$$$$$$$$$$",
  _KWA: "KWA",
  _fname: "Jean-Yves",
  _lname: "Chaillou",
  _mail: "jeanyves.chaillou@gmail.com",
  blank: function ( nbBlank ) {
    var bloc = '';
    for ( var k = 0; k < nbBlank; k++ ) {
      bloc += ' ';
    }
    return bloc;
  },
  logo: function () {
    var logo = "";
    logo += '\n';
    logo += '╔══════════════════════════════════════════════════════════╗' + '\n';
    logo += '║                ██╗  ██╗██╗    ██╗ █████╗             2018║' + '\n';
    logo += '║                ██║ ██╔╝██║    ██║██╔══██╗                ║' + '\n';
    logo += '║                █████╔╝ ██║ █╗ ██║███████║                ║' + '\n';
    logo += '║                ██╔═██╗ ██║███╗██║██╔══██║                ║' + '\n';
    logo += '║                ██║  ██╗╚███╔███╔╝██║  ██║                ║' + '\n';
    logo += '║   Copyright®™  ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝  >KWA!         ║' + '\n';
    logo += '╚══════════════════════════════════════════════════════════╝' + '\n';
    return logo;
  },
  copyright: function ( mark ) {
    var cpr = "";
    // var d = new Date();

    cpr += JSEASY.textHelpers.logo();

    cpr += JSEASY.textHelpers._linegap;
    cpr += JSEASY.textHelpers._linegap;
    cpr += JSEASY.textHelpers._linegap;

    // cpr += writeInBloc(d.date.toString() + ' ' + d.month.toString() + ' ' + d.fullYear.toString());

    cpr += JSEASY.textHelpers._linegap;

    cpr += JSEASY.writeInBloc.title( mark );
    cpr += JSEASY.textHelpers._linegap;
    cpr += JSEASY.textHelpers._linegap;
    cpr += JSEASY.nfoAlphabet.word( '  ' + mark );
    cpr += JSEASY.textHelpers._linegap;
    cpr += JSEASY.textHelpers._linegap;

    cpr += JSEASY.writeInBloc.paragraphe( JSEASY.textHelpers._fname + ' ' + JSEASY.textHelpers._lname + ' @ ' + JSEASY.textHelpers._KWA );

    cpr += JSEASY.textHelpers._linegap;
    cpr += JSEASY.writeInBloc.paragraphe( JSEASY.codeAsciiConvertor( JSEASY.textHelpers._KWA ) );
    cpr += JSEASY.writeInBloc.paragraphe( JSEASY.textHelpers._mail );
    return cpr;
  }
};
/**
* Object hackerAlphabet collection
* @function JSEASY.hackerAlphabet.translate(string) - convert - revert string in "HackerMode/normalMode" - @return {string}
* @example 1 - JSEASY.hackerAlphabet.translate("ce que je veux traduire") //return "СЭ 9ЦЭ 7Э ѴЭЦЖ ТЯДDЦ!ЯЭ"
* @example 2 - JSEASY.hackerAlphabet.translate("СЭ 9ЦЭ 7Э ѴЭЦЖ ТЯДDЦ!ЯЭ") //return "ce que je veux traduire"
*/
JSEASY.hackerAlphabet = {
  translate: function(txt){
    var hackerText = '';
    for (var i = 0; i < txt.length; i++) {
      switch (txt[i]) {
        case "Д":
          hackerText += "A";
          break;
        case "8":
          hackerText += "B";
          break;
        case "С":
          hackerText += "C";
          break;
        case "D":
          hackerText += 'D';
          break;
        case "Э":
          hackerText += "E";
          break;
        case "Г":
          hackerText += "F";
          break;
        case "9":
          hackerText += "G";
          break;
        case "µ":
          hackerText += "H";
          break;
        case "!":
          hackerText += "I";
          break;
        case "7":
          hackerText += "J";
          break;
        case "£":
          hackerText += "K";
          break;
        case "1":
          hackerText += "L";
          break;
        case "Щ":
          hackerText += "M";
          break;
        case "И":
          hackerText += "N";
          break;
        case "Ф":
          hackerText += "O";
          break;
        case "Ь":
          hackerText += "P";
          break;
        case "9":
          hackerText += "Q";
          break;
        case "Я":
          hackerText += "R";
          break;
        case "ʂ":
          hackerText += "S";
          break;
        case "Т":
          hackerText += "T";
          break;
        case "Ц":
          hackerText += "U";
          break;
        case "Ѵ":
          hackerText += "V";
          break;
        case "Щ":
          hackerText += "W";
          break;
        case "Ж":
          hackerText += "X";
          break;
        case "У":
          hackerText += "Y";
          break;
        case "2":
          hackerText += "Z";
          break;
        case "a":
        case "A":
          hackerText += "Д";
          break;
        case "b":
        case "B":
          hackerText += "8";
          break;
        case "c":
        case "C":
          hackerText += "С";
          break;
        case "d":
        case "D":
          hackerText += 'D';
          break;
        case "e":
        case "E":
          hackerText += "Э";
          break;
        case "f":
        case "F":
          hackerText += "Г";
          break;
        case "g":
        case "G":
          hackerText += "9";
          break;
        case "h":
        case "H":
          hackerText += "µ";
          break;
        case "i":
        case "I":
          hackerText += "!";
          break;
        case "j":
        case "J":
          hackerText += "7";
          break;
        case "k":
        case "K":
          hackerText += "£";
          break;
        case "l":
        case "L":
          hackerText += "1";
          break;
        case "m":
        case "M":
          hackerText += "Щ";
          break;
        case "n":
        case "N":
          hackerText += "И";
          break;
        case "o":
        case "O":
          hackerText += "Ф";
          break;
        case "p":
        case "P":
          hackerText += "Ь";
          break;
        case "q":
        case "Q":
          hackerText += "9";
          break;
        case "r":
        case "R":
          hackerText += "Я";
          break;
        case "s":
        case "S":
          hackerText += "ʂ";
          break;
        case "t":
        case "T":
          hackerText += "Т";
          break;
        case "u":
        case "U":
          hackerText += "Ц";
          break;
        case "v":
        case "V":
          hackerText += "Ѵ";
          break;
        case "w":
        case "W":
          hackerText += "Щ";
          break;
        case "x":
        case "X":
          hackerText += "Ж";
          break;
        case "y":
        case "Y":
          hackerText += "У";
          break;
        case "z":
        case "Z":
          hackerText += "2";
          break;
        case "0":
          hackerText += "0";
          break;
        case "1":
          hackerText += "1";
          break;
        case "2":
          hackerText += "2";
          break;
        case "3":
          hackerText += "3";
          break;
        case "4":
          hackerText += "4";
          break;
        case "5":
          hackerText += "5";
          break;
        case "6":
          hackerText += "6";
          break;
        case "7":
          hackerText += "7";
          break;
        case "8":
          hackerText += "8";
          break;
        case "9":
          hackerText += "9";
          break;
        case "!":
          hackerText += "!";
          break;
        case ".":
          hackerText += ".";
          break;
        case "?":
          hackerText += "?";
          break;
        case " ":
          hackerText += " ";
          break;

        default:
          hackerText += " ";
          break;

      }
    }
    return hackerText;
  }
}
/**
* BIG CHARACTERS NFO TRANSLATER Collection
* @member [a to z && 0-9 && !?.*] the characters collection
* @function JSEASY.nfoAlphabet.letter(string) - @param {string} character - @return {string}
* @function JSEASY.nfoAlphabet.word(string) - @param {string} string - generate a BIG WORD using JSEASY.nfoAlphabet.letter  - @return {string}
*/

JSEASY.nfoAlphabet = {
  a: [
    [ " █████╗ " ],
    [ "██╔══██╗" ],
    [ "███████║" ],
    [ "██╔══██║" ],
    [ "██║  ██║" ],
    [ "╚═╝  ╚═╝" ]
  ],
  b: [
    [ "██████╗ " ],
    [ "██╔══██╗" ],
    [ "██████╔╝" ],
    [ "██╔══██╗" ],
    [ "██████╔╝" ],
    [ "╚═════╝ " ]
  ],
  c: [
    [ " ██████╗" ],
    [ "██╔════╝" ],
    [ "██║     " ],
    [ "██║     " ],
    [ "╚██████╗" ],
    [ " ╚═════╝" ]
  ],
  d: [
    [ "██████╗ " ],
    [ "██╔══██╗" ],
    [ "██║  ██║" ],
    [ "██║  ██║" ],
    [ "██████╔╝" ],
    [ "╚═════╝ " ]
  ],
  e: [
    [ "███████╗" ],
    [ "██╔════╝" ],
    [ "█████╗  " ],
    [ "██╔══╝  " ],
    [ "███████╗" ],
    [ "╚══════╝" ]
  ],
  f: [
    [ "███████╗" ],
    [ "██╔════╝" ],
    [ "█████╗  " ],
    [ "██╔══╝  " ],
    [ "██║     " ],
    [ "╚═╝     " ]
  ],
  g: [
    [ " ██████╗ " ],
    [ "██╔════╝ " ],
    [ "██║  ███╗" ],
    [ "██║   ██║" ],
    [ "╚██████╔╝" ],
    [ " ╚═════╝ " ]
  ],
  h: [
    [ "██╗  ██╗" ],
    [ "██║  ██║" ],
    [ "███████║" ],
    [ "██╔══██║" ],
    [ "██║  ██║" ],
    [ "╚═╝  ╚═╝" ]
  ],
  i: [
    [ "██╗" ],
    [ "██║" ],
    [ "██║" ],
    [ "██║" ],
    [ "██║" ],
    [ "╚═╝" ]
  ],
  j: [
    [ "     ██╗" ],
    [ "     ██║" ],
    [ "     ██║" ],
    [ "██   ██║" ],
    [ "╚█████╔╝" ],
    [ " ╚════╝ " ]
  ],
  k: [
    [ "██╗  ██╗" ],
    [ "██║ ██╔╝" ],
    [ "█████╔╝ " ],
    [ "██╔═██╗ " ],
    [ "██║  ██╗" ],
    [ "╚═╝  ╚═╝" ]
  ],
  l: [
    [ "██╗     " ],
    [ "██║     " ],
    [ "██║     " ],
    [ "██║     " ],
    [ "███████╗" ],
    [ "╚══════╝" ]
  ],
  m: [
    [ "███╗   ███╗" ],
    [ "████╗ ████║" ],
    [ "██╔████╔██║" ],
    [ "██║╚██╔╝██║" ],
    [ "██║ ╚═╝ ██║" ],
    [ "╚═╝     ╚═╝" ]
  ],
  n: [
    [ "███╗   ██╗" ],
    [ "████╗  ██║" ],
    [ "██╔██╗ ██║" ],
    [ "██║╚██╗██║" ],
    [ "██║ ╚████║" ],
    [ "╚═╝  ╚═══╝" ]
  ],
  o: [
    [ " ██████╗ " ],
    [ "██╔═══██╗" ],
    [ "██║   ██║" ],
    [ "██║   ██║" ],
    [ "╚██████╔╝" ],
    [ " ╚═════╝ " ]
  ],
  p: [
    [ "██████╗ " ],
    [ "██╔══██╗" ],
    [ "██████╔╝" ],
    [ "██╔═══╝ " ],
    [ "██║     " ],
    [ "╚═╝     " ]
  ],
  q: [
    [ " ██████╗ " ],
    [ "██╔═══██╗" ],
    [ "██║   ██║" ],
    [ "██║▄▄ ██║" ],
    [ "╚██████╔╝" ],
    [ " ╚══▀▀═╝ " ]
  ],
  r: [
    [ "██████╗ " ],
    [ "██╔══██╗" ],
    [ "██████╔╝" ],
    [ "██╔══██╗" ],
    [ "██║  ██║" ],
    [ "╚═╝  ╚═╝" ]
  ],
  s: [
    [ "███████╗" ],
    [ "██╔════╝" ],
    [ "███████╗" ],
    [ "╚════██║" ],
    [ "███████║" ],
    [ "╚══════╝" ]
  ],
  t: [
    [ "████████╗" ],
    [ "╚══██╔══╝" ],
    [ "   ██║   " ],
    [ "   ██║   " ],
    [ "   ██║   " ],
    [ "   ╚═╝   " ]
  ],
  u: [
    [ "██╗   ██╗" ],
    [ "██║   ██║" ],
    [ "██║   ██║" ],
    [ "██║   ██║" ],
    [ "╚██████╔╝" ],
    [ " ╚═════╝ " ]
  ],
  v: [
    [ "██╗   ██╗" ],
    [ "██║   ██║" ],
    [ "██║   ██║" ],
    [ "╚██╗ ██╔╝" ],
    [ " ╚████╔╝ " ],
    [ "  ╚═══╝  " ]
  ],
  w: [
    [ "██╗    ██╗" ],
    [ "██║    ██║" ],
    [ "██║ █╗ ██║" ],
    [ "██║███╗██║" ],
    [ "╚███╔███╔╝" ],
    [ " ╚══╝╚══╝ " ]
  ],
  x: [
    [ "██╗  ██╗" ],
    [ "╚██╗██╔╝" ],
    [ " ╚███╔╝ " ],
    [ " ██╔██╗ " ],
    [ "██╔╝ ██╗" ],
    [ "╚═╝  ╚═╝" ]
  ],
  y: [
    [ "██╗   ██╗" ],
    [ "╚██╗ ██╔╝" ],
    [ " ╚████╔╝ " ],
    [ "  ╚██╔╝  " ],
    [ "   ██║   " ],
    [ "   ╚═╝   " ]
  ],
  z: [
    [ "███████╗" ],
    [ "╚══███╔╝" ],
    [ "  ███╔╝ " ],
    [ " ███╔╝  " ],
    [ "███████╗" ],
    [ "╚══════╝" ]
  ],
  _0: [
    [ " ██████╗ " ],
    [ "██╔═████╗" ],
    [ "██║██╔██║" ],
    [ "████╔╝██║" ],
    [ "╚██████╔╝" ],
    [ " ╚═════╝ " ]
  ],
  _1: [
    [ " ██╗" ],
    [ "███║" ],
    [ "╚██║" ],
    [ " ██║" ],
    [ " ██║" ],
    [ " ╚═╝" ]
  ],
  _2: [
    [ "██████╗ " ],
    [ "╚════██╗" ],
    [ " █████╔╝" ],
    [ "██╔═══╝ " ],
    [ "███████╗" ],
    [ "╚══════╝" ]
  ],
  _3: [
    [ "██████╗ " ],
    [ "╚════██╗" ],
    [ " █████╔╝" ],
    [ " ╚═══██╗" ],
    [ "██████╔╝" ],
    [ "╚═════╝ " ]
  ],
  _4: [
    [ "██╗  ██╗" ],
    [ "██║  ██║" ],
    [ "███████║" ],
    [ "╚════██║" ],
    [ "     ██║" ],
    [ "     ╚═╝" ]
  ],
  _5: [
    [ "███████╗" ],
    [ "██╔════╝" ],
    [ "███████╗" ],
    [ "╚════██║" ],
    [ "███████║" ],
    [ "╚══════╝" ]
  ],
  _6: [
    [ " ██████╗ " ],
    [ "██╔════╝ " ],
    [ "███████╗ " ],
    [ "██╔═══██╗" ],
    [ "╚██████╔╝" ],
    [ " ╚═════╝ " ]
  ],
  _7: [
    [ "███████╗" ],
    [ "╚════██║" ],
    [ "    ██╔╝" ],
    [ "   ██╔╝ " ],
    [ "   ██║  " ],
    [ "   ╚═╝  " ]
  ],
  _8: [
    [ " █████╗ " ],
    [ "██╔══██╗" ],
    [ "╚█████╔╝" ],
    [ "██╔══██╗" ],
    [ "╚█████╔╝" ],
    [ " ╚════╝ " ]
  ],
  _9: [
    [ " █████╗ " ],
    [ "██╔══██╗" ],
    [ "╚██████║" ],
    [ " ╚═══██║" ],
    [ " █████╔╝" ],
    [ " ╚════╝ " ]
  ],
  _exc: [
    [ "██╗" ],
    [ "██║" ],
    [ "██║" ],
    [ "╚═╝" ],
    [ "██╗" ],
    [ "╚═╝" ]
  ],
  _dot: [
    [ "   " ],
    [ "   " ],
    [ "   " ],
    [ "   " ],
    [ "██╗" ],
    [ "╚═╝" ]
  ],
  _space: [
    [ "   " ],
    [ "   " ],
    [ "   " ],
    [ "   " ],
    [ "   " ],
    [ "   " ]
  ],
  _int: [
    [ "██████╗ " ],
    [ "╚════██╗" ],
    [ "  ▄███╔╝" ],
    [ "  ▀▀══╝ " ],
    [ "  ██╗   " ],
    [ "  ╚═╝   " ]
  ],_star: [
    [ "   ██╗   " ],
    [ " ██████╗ " ],
    [ " ╚═██╔═╝ " ],
    [ "   ╚═╝   " ],
    [ "         " ],
    [ "         " ]
  ],
  letter: function ( ltr ) {
    switch ( ltr ) {
      case "a":
      case "A":
        return JSEASY.nfoAlphabet.a;
        break;
      case "b":
      case "B":
        return JSEASY.nfoAlphabet.b;
        break;
      case "c":
      case "C":
        return JSEASY.nfoAlphabet.c;
        break;
      case "d":
      case "D":
        return JSEASY.nfoAlphabet.d;
        break;
      case "e":
      case "E":
        return JSEASY.nfoAlphabet.e;
        break;
      case "f":
      case "F":
        return JSEASY.nfoAlphabet.f;
        break;
      case "g":
      case "G":
        return JSEASY.nfoAlphabet.g;
        break;
      case "h":
      case "H":
        return JSEASY.nfoAlphabet.h;
        break;
      case "i":
      case "I":
        return JSEASY.nfoAlphabet.i;
        break;
      case "j":
      case "J":
        return JSEASY.nfoAlphabet.j;
        break;
      case "k":
      case "K":
        return JSEASY.nfoAlphabet.k;
        break;
      case "l":
      case "L":
        return JSEASY.nfoAlphabet.l;
        break;
      case "m":
      case "M":
        return JSEASY.nfoAlphabet.m;
        break;
      case "n":
      case "N":
        return JSEASY.nfoAlphabet.n;
        break;
      case "o":
      case "O":
        return JSEASY.nfoAlphabet.o;
        break;
      case "p":
      case "P":
        return JSEASY.nfoAlphabet.p;
        break;
      case "q":
      case "Q":
        return JSEASY.nfoAlphabet.q;
        break;
      case "r":
      case "R":
        return JSEASY.nfoAlphabet.r;
        break;
      case "s":
      case "S":
        return JSEASY.nfoAlphabet.s;
        break;
      case "t":
      case "T":
        return JSEASY.nfoAlphabet.t;
        break;
      case "u":
      case "U":
        return JSEASY.nfoAlphabet.u;
        break;
      case "v":
      case "V":
        return JSEASY.nfoAlphabet.v;
        break;
      case "w":
      case "W":
        return JSEASY.nfoAlphabet.w;
        break;
      case "x":
      case "X":
        return JSEASY.nfoAlphabet.x;
        break;
      case "y":
      case "Y":
        return JSEASY.nfoAlphabet.y;
        break;
      case "z":
      case "Z":
        return JSEASY.nfoAlphabet.z;
        break;
      case "0":
        return JSEASY.nfoAlphabet._0;
        break;
      case "1":
        return JSEASY.nfoAlphabet._1;
        break;
      case "2":
        return JSEASY.nfoAlphabet._2;
        break;
      case "3":
        return JSEASY.nfoAlphabet._3;
        break;
      case "4":
        return JSEASY.nfoAlphabet._4;
        break;
      case "5":
        return JSEASY.nfoAlphabet._5;
        break;
      case "6":
        return JSEASY.nfoAlphabet._6;
        break;
      case "7":
        return JSEASY.nfoAlphabet._7;
        break;
      case "8":
        return JSEASY.nfoAlphabet._8;
        break;
      case "9":
        return JSEASY.nfoAlphabet._9;
        break;
      case "!":
        return JSEASY.nfoAlphabet._exc;
        break;
      case ".":
        return JSEASY.nfoAlphabet._dot;
        break;
      case "?":
        return JSEASY.nfoAlphabet._int;
        break;
      case " ":
        return JSEASY.nfoAlphabet._space;
        break;
        case "*":
          return JSEASY.nfoAlphabet._star;
          break;

      default:
        return JSEASY.nfoAlphabet._space;
        break;
    }
  },
  word: function ( myWord ) {
    let ar = myWord;
    let nfoWord = '';
    const letterLine = 6;
    for ( var i = 0; i < letterLine; i++ ) {
      let rawLetter = ''; // ligne
      for ( var j = 0; j < ar.length; j++ ) {
        //Letter
        for ( var k = 0; k < JSEASY.nfoAlphabet.letter( ar[ j ] )[ i ].length; k++ ) { //LetterLigne of letter Array
          //Cell
          rawLetter += JSEASY.nfoAlphabet.letter( ar[ j ] )[ i ][ k ];
          // console.log(rawLetter);
        }
        // JSEASY.nfoAlphabet.word(ar[j])[i]
      }
      nfoWord += rawLetter;
      nfoWord += "\n";

    }
    return nfoWord;
  }
}
/**
* for write a remarquable text !
* @function JSEASY.writeInBloc.paragraphe(string) - @param {string} "any string" - @return {string} the string in the center of stars
* @return {Type} - the description
*/

JSEASY.writeInBloc = {
  paragraphe: function ( ...rest ) {
    var allSentences = rest;
    var bloc = "\n";
    var linesize = 60;
    bloc += "************************************************************"
    bloc += '\n';
    for ( var i = 0; i < allSentences.length; i++ ) {
      var txt = JSEASY.formatText( allSentences[ i ] );
      bloc += '*';
      var nbspaces = Math.ceil( ( ( linesize - txt.length ) - 2 ) / 2 );
      for ( var j = 0; j < nbspaces; j++ ) {
        bloc += ' ';
      }
      bloc += txt;
      for ( var k = 0; k < nbspaces; k++ ) {
        bloc += ' ';
      }
      bloc += '*';
      bloc += '\n';
    }
    bloc += "************************************************************";
    return bloc;
  },

  title: function ( text, centered = true, _maxChara = 60 ) {
    const maxChara = _maxChara;
    var blocSize = text.length + 4;
    var txt = "\n";

    if ( centered ) txt += JSEASY.textHelpers.blank( Math.ceil( ( maxChara - blocSize ) / 2 ) )
    for ( var i = 0; i < blocSize; i++ ) {
      txt += JSEASY.textHelpers._star;
    }

    txt += JSEASY.textHelpers._linegap;
    if ( centered ) txt += JSEASY.textHelpers.blank( Math.ceil( ( maxChara - blocSize ) / 2 ) )
    txt += JSEASY.textHelpers._star + JSEASY.textHelpers._space + text + JSEASY.textHelpers._space + JSEASY.textHelpers._star;
    txt += JSEASY.textHelpers._linegap;

    if ( centered ) txt += JSEASY.textHelpers.blank( Math.ceil( ( maxChara - blocSize ) / 2 ) )
    for ( var ii = 0; ii < blocSize; ii++ ) {
      txt += JSEASY.textHelpers._star;
    }

    return txt;
  }

}
/**
* JSEASY.tools // des outils utils
* @function JSEASY.tools.texts.shufflize(string,number) - @param {string} "string set" - @param {number} facultatif  a new length to truncate string nothing to keep the same size- @return {string} the shufflelized (truncated) string in the center of stars
* @function JSEASY.tools.texts.changeLetterAt(string,string,integer) - @param {string} "string set" - @param {string} - the new chara - @param {integer} - where the new letter gone @return {string} - the new string set
* @function JSEASY.tools.texts.matrixifize(integer,string,integer,function,domElement) - @param {integer} - nbRains - @param {string} - charaSet - @param {integer} - the grid size @param {function} - callBack updater @param {domElement} facultatif - the div id
* @function JSEASY.tools.texts.matrixTfUpdater(nbRains,charaSets,setsPositions,gridSize,id,output) //CallBack to Update the matrix effect on the textField
*/
JSEASY.tools = {
  texts: {
    shufflize: function(txt, sizeSet=-1){
      // console.log(txt.length);
      var leftSet = txt;
      var newSet = '';

      var currentIndex = (sizeSet == -1)?txt.length:sizeSet;
      var randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // console.log(currentIndex)
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * leftSet.length);
          currentIndex -= 1;
          let chara = leftSet.charAt(randomIndex);
          let tmpSet = leftSet.substring(0,randomIndex);
          tmpSet += leftSet.substring(randomIndex+1,leftSet.length);
          leftSet = tmpSet;

          newSet += chara;

        }
        return newSet;
      },
      changeLetterAt: function(charaSet, letter, index){
        var set = charaSet+'';
        var begin = set.substring(0,index);
        var end = set.substring(index+1, charaSet.length);
        console.log("set: "+ set,"length: "+charaSet.length,"Position: " + index, "select: "+ begin+"["+charaSet.charAt(index)+"]"+end ,"replace: " + letter,"new: "+ begin+"["+letter+"]"+end);
        return begin + letter + end;

      },
      matrixifize : function(nbRains,charaSet,gridSize, callback, domElement = null){
        // jeux de caracteres
        var charaSets = [];
        // positions [col][rangées]
        var setsPositions = [];
        // random de 0 a 10 ( pour positionner les col de caracteres)
        var random = JSEASY.tools.math.randomSet(10);
        // boucle sur le nombre de pluies
        for (var j = 0; j < nbRains; j++) {
          //definition des differants jeux de carateres par nb de pluies
          charaSets.push(JSEASY.tools.texts.shufflize(charaSet,15));
          // [definition des la position de la pluie (col)][positionde la pluie (rangées)]
          setsPositions.push([random[j],-Math.floor(Math.random()*20)]);
        }

        // creation de la zone textuelle dnas la page html
        // TODO: condition si la zone est deja existante
        var output = (domElement != null)?domElement : document.createElement('div');
        // output.maxLength = gridSize*gridSize ;
        // output.cols = gridSize;
        // output.rows = gridSize;

        output.style.fontFamily = "Courier New, Courier";
        output.style.color = "green";
        output.style.backgroundColor = "black";
        let txt = '';
        //remplissage de la zone textuelle
        for (var k = 0; k < (gridSize); k++) {
          for (var l = 0; l < (gridSize); l++) {
            txt  += '.';
          }
          txt  += '\n';
        }
        output.appendChild(document.createTextNode(txt));
        if(domElement == null)document.body.appendChild(output);
        // output.readOnly = true;
        //callBack et update
        // TODO: a activer
        // var id = setInterval(function(){
        //     callback(nbRains, charaSets, setsPositions, gridSize, id, output);
        // },250);

        // callback(nbRains, charaSets, setsPositions, gridSize, 2, output);
        // callback(nbRains, charaSets, setsPositions, gridSize, 2, output);

      },
      matrixTfUpdater: function(nbRains, charaSets, setsPositions, gridSize, id , output){
        /*console.clear();*/
        // récuperation du text de la zone
        // transformation en tableau à partir des sauts de ligne
        // console.log(output);
        var prevTxt = output.innerText || output.textContent;
        var nextOutput = prevTxt.split(' ');
        console.log("FIRST", nextOutput, nextOutput.length);
        // sup^pression du dernier element ( vide )
        // nextOutput.pop();
        //verification des differants elements
        // console.log(nbRains, charaSets, setsPositions, gridSize, id);
        //TODO: Coder ca !
        //boucle sur le nb de pluies (r)
              // recuperation  setsPosition[(r)][0(pos)];
              // Condition si l'index (pos) est compris entre 0 et la taille de la gridSize
                            // re boucle  sur le tableau des set de caracteres  // charaSet[(r)].length
                            //            // definitio nde  la position real sur la grille
                                          //re condition si la l'index des caractere suivant sont compris entre 0 et gridSize
                                                  //  >>> swap !
       let isSwap = false;
       let posCol = setsPositions[0][0];
         if( posCol >0 && posCol < gridSize){
           let posRaw = setsPositions[0][1];
           for (var i = 0; i < charaSets[0].length; i++) {
             let realP =   (posRaw-i)+1;
             // console.log("charaset id: #", i, "try swap realP: #", realP);
             if(realP > -1 && realP < gridSize){
               isSwap = true;
               if(realP == (gridSize-1)){
                 nextOutput[realP] = JSEASY.tools.texts.changeLetterAt(nextOutput[realP],'.',posCol);
               }else{
                 let nChara = charaSets[0][i];
                 // console.log("SWAP:",realP);
                 // console.log("nextOutput",nextOutput);
                 //console.log("IN",  nextOutput[realP]," SWAP", nextOutput[realP][posCol], "to", nChara, "at col:", posCol.valueOf(),", raw:",realP);
                 JSEASY.trace(nextOutput[realP]);
                 nextOutput[realP] = JSEASY.tools.texts.changeLetterAt(nextOutput[realP],nChara,posCol);
                 JSEASY.trace(nextOutput[realP]);

               }


             }
           }
           setsPositions[0][1]++;
           if(setsPositions[0][1] >= (gridSize*2)){
             setsPositions[0][1] = -(gridSize*2);
           }
         }
        // for (var r = 0; r < nbRains; r++) {
        //   let posCol = setsPositions[r][0]
        //   if( posCol >0 && posCol < gridSize){
        //     let posRaw = setsPositions[r][1];
        //     for (var i = 0; i < charaSets[r].length; i++) {
        //       let realP =   posRaw-i;
        //       // console.log("charaset id: #", i, "try swap realP: #", realP);
        //       if(realP > -1 && realP < gridSize){
        //         isSwap = true;
        //         if(realP == gridSize-1){
        //           nextOutput[realP] = JSEASY.tools.texts.changeLetterAt(nextOutput[realP],'.',posCol);
        //         }else{
        //           let nChara = charaSets[r][i];
        //           // console.log("SWAP:",realP);
        //           // console.log("nextOutput",nextOutput);
        //           console.log("IN",  nextOutput[realP]," SWAP", nextOutput[realP][posCol], "to", nChara, "at col:", posCol.valueOf(),", raw:",realP);
        //           nextOutput[realP] = JSEASY.tools.texts.changeLetterAt(nextOutput[realP],nChara,posCol);
        //         }
        //
        //
        //       }
        //     }
        //     setsPositions[r][1]++;
        //     if(setsPositions[r][1] >= (gridSize*2)){
        //       setsPositions[r][1] = -(gridSize*2);
        //     }
        //   }
        // }//end for nbRains
        if(isSwap){
          console.log(nextOutput, nextOutput.length);
          var newTxt = '';
          for (var k = 0; k < (gridSize); k++) {
           for (var i = 0; i < nextOutput[k].length; i++) {
             newTxt+=nextOutput[k][i];
           }
           newTxt += '\n';
          }
          // console.log(newTxt);
          output.innerText = '';
          output.appendChild(document.createTextNode(newTxt));
          // output.style.color = "green";
        }

      }
    },
    matrixStop: function(ids){
      for (var i = 0; i < ids.length; i++) {
        clearInterval(ids[i]);
      }
    },

  net: {
    ajaxGet: function( url, callback ) {
      var req = new XMLHttpRequest();
      req.open( "GET", url );
      req.addEventListener( "load", function () {
        if ( req.status >= 200 && req.status < 400 ) {
          console.log( url + ' ...loaded' );
          // Appelle la fonction callback en lui passant la réponse de la requête
          callback( req.responseText );
        } else {
          console.error( req.status + " " + req.statusText + " " + url );
        }
      } );
      req.addEventListener( "error", function () {
        console.error( "Erreur réseau avec l'URL " + url );
      } );
      req.send( null );
    },
    ajaxPost: function( url, data, callback, isJson = false ) {
      var req = new XMLHttpRequest();
      req.open( "POST", url );
      req.addEventListener( "load", function () {
        if ( req.status >= 200 && req.status < 400 ) {
          // Appelle la fonction callback en lui passant la réponse de la requête
          callback( req.responseText );
        } else {
          console.error( req.status + " " + req.statusText + " " + url );
          callback( 'error' );
        }
      } );
      req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url );
        callback( 'error' );
      } );
      if ( isJson ) {
        // Définit le contenu de la requête comme étant du JSON
        req.setRequestHeader( "Content-Type", "application/json" );
        // Transforme la donnée du format JSON vers le format texte avant l'envoi
        data = JSON.stringify( data );
      }
      req.send(data);
    }
  },
  graphics: {
    hitTest: function (elmt1, elmt2) {
      var rectObj = elmt1.getBoundingClientRect();
      var rectTest = elmt2.getBoundingClientRect();
     // heros
      var hX = rectObj.x;
      var hXw = rectObj.x + rectObj.width;
      var hY = rectObj.y ;
      var hYh = rectObj.y + rectObj.height;

      // enemis
      var eX = rectTest.x
      var eXw = rectTest.x + rectTest.width;
      var eY = rectTest.y
      var eYh = rectTest.y + rectTest.height;
      // debug('h:'+ rectObj.x +' e:'+ rectTest.x);

      if(hX<eX && hXw<eX)return false;
      if(hX>eXw && hXw>eXw)return false;
      if(hY<eY && hYh<eY)return false;
      if(hY>eYh && hYh>eYh)return false;
      return true;
    }
  },
  math:{
    randomSet (nb) {
      var set = '';
      var tmpSet = [];
      for (var i = 0; i < nb; i++) {
        set += i;
      }
      var newSet = JSEASY.tools.texts.shufflize(set);
      return newSet;

    }
  },
  array: {
    addClass(_element, _class){
      //// TODO: addClass
    }
  },
  generate:{
    html:{
      div(_id=null, _class=null, _container=null){

        var dv = document.createElement("div");
        if(_id != null)dv.id = _id;
        if(_class != null)dv.className = _class;
        if(_container != null)_container.appendChild(dv);

        return dv;
      }
    }
  }

}

JSEASY.gameEngine = {
  _container:null,
  world : function (container) {
    JSEASY.gameEngine._container = JSEASY.gameEngine._container == null ?document.getElementById(container):JSEASY.gameEngine._container;
    return JSEASY.gameEngine._container;
  }

}

JSEASY.copyToClipboard = str => {
  const el = document.createElement('textarea');  // Create a <textarea> element
  el.value = str;                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
}
JSEASY.hexfromdec = function(num) {
	if (num > 65535) { return ("overflow!") }
	first = Math.round(num/4096 - .5);
    temp1 = num - first * 4096;
    second = Math.round(temp1/256 - .5);
    temp2 = temp1 - second * 256;
    third = Math.round(temp2/16 - .5);
    fourth = temp2 - third * 16;

    return (""+JSEASY.getletter(first)+JSEASY.getletter(second)+JSEASY.getletter(third)+JSEASY.getletter(fourth));
}

JSEASY.getletter = function(num) {
	if (num < 10) {
		return num;
	}
	else
	{
		if (num == 10) { return "A" }
                if (num == 11) { return "B" }
                if (num == 12) { return "C" }
                if (num == 13) { return "D" }
                if (num == 14) { return "E" }
                if (num == 15) { return "F" }
        }
}

JSEASY.binfromdec = function(num) {
	 var bit16=0, bit15=0, bit14=0, bit13=0, bit12=0, bit11=0, bit10=0, bit9=0, bit8=0, bit7=0, bit6=0, bit5=0, bit4=0, bit3=0, bit2=0, bit1=0;
         if (num > 65535) { return ("overflow!") }
	if (num & 32768) { bit16 = 1 }
	if (num & 16384) { bit15 = 1 }
	if (num & 8192) { bit14 = 1 }
	if (num & 4096) { bit13 = 1 }
	if (num & 2048) { bit12 = 1 }
	if (num & 1024) { bit11 = 1 }
	if (num & 512) { bit10 = 1 }
	if (num & 256) { bit9 = 1 }
	if (num & 128) { bit8 = 1 }
	if (num & 64) { bit7 = 1 }
	if (num & 32) { bit6 = 1 }
	if (num & 16) { bit5 = 1 }
	if (num & 8) { bit4 = 1 }
	if (num & 4) { bit3 = 1 }
	if (num & 2) { bit2 = 1 }
	if (num & 1) { bit1 = 1 }
	return (""+bit16+bit15+bit14+bit13+bit12+bit11+bit10+bit9+bit8+bit7+bit6+bit5+bit4+bit3+bit2+bit1);
}

JSEASY.decfromhex = function(num) {
	while (num.length < 4) {
		num = "0" + num;
	}
        return (eval(JSEASY.getnum(num.substring(3,4))) + eval(JSEASY.getnum(num.substring(2,3))) * 16 +
eval(JSEASY.getnum(num.substring(1,2))) * 256 + eval(JSEASY.getnum(num.substring(0,1))) * 4096);
 }

JSEASY.getnum = function(letter) {
	if (letter <= "9") {
		return letter;
	}
	else
	{
		if ((letter == "a") || (letter == "A")) { return 10 }
		if ((letter == "b") || (letter == "B")) { return 11 }
		if ((letter == "c") || (letter == "C")) { return 12 }
		if ((letter == "d") || (letter == "D")) { return 13 }
		if ((letter == "e") || (letter == "E")) { return 14 }
		if ((letter == "f") || (letter == "F")) { return 15 }
		return 0;
	}
}

JSEASY.decfrombin = function(num) {
	var decimal = 0;
	while (num.length < 16) {
	 	num = "0" + num;
	}
	if (num.substring(15,16) == "1") { decimal++ }
	if (num.substring(14,15) == "1") { decimal = decimal + 2 }
	if (num.substring(13,14) == "1") { decimal = decimal + 4 }
	if (num.substring(12,13) == "1") { decimal = decimal + 8 }
	if (num.substring(11,12) == "1") { decimal = decimal + 16 }
	if (num.substring(10,11) == "1") { decimal = decimal + 32 }
	if (num.substring(9,10) == "1") { decimal = decimal + 64 }
	if (num.substring(8,9) == "1") { decimal = decimal + 128 }
	if (num.substring(7,8) == "1") { decimal = decimal + 256 }
	if (num.substring(6,7) == "1") { decimal = decimal + 512 }
	if (num.substring(5,6) == "1") { decimal = decimal + 1024 }
	if (num.substring(4,5) == "1") { decimal = decimal + 2048 }
	if (num.substring(3,4) == "1") { decimal = decimal + 4096 }
	if (num.substring(2,3) == "1") { decimal = decimal + 8192 }
	if (num.substring(1,2) == "1") { decimal = decimal + 16384 }
	if (num.substring(0,1) == "1") { decimal = decimal + 32768 }
        return(decimal);
}

/**
* Array.prototype.clone
* @method clone
* @return {Array} the copy of the array
* @description to clone / copy a Array
*/

Array.prototype.clone = function () {
  let cln = this.slice();
	return cln.slice();
};

/**
* Object.prototype.remClass
* @method remClass  add a remClass methode to Objects
* @param  {String} _class the class to remove
* @description to remove a dom class to a HTMLElement
*/

Object.prototype.remClass = function (_class) {
  var arCl = this.className.split(' ');
  var newClass = '';
  for (var i = 0; i < arCl.length; i++) {
    if (_class != arCl[i] && arCl[i] != "" && arCl[i] != " ") {
      newClass += ' ' + arCl[i];
    } else {

    }
  }
  this.className = newClass;
};

/**
* Object.prototype.addClass
* @method addClass  add a addClass methode to Objects
* @param  {String} _class the class to add
* @description to add a dom class to a HTMLElement
*/
Object.prototype.addClass = function (_class) {
  var arCl = this.className.split(' ');

  this.className += (arCl.indexOf(_class) == -1)?(' '+_class):'';
};
