
var allWords_;

function loadJavaDocument (url) {
  console.log('loading java document: ', url);
  ajaxGet(url, function (rep) {
    // console.log(rep)
    allWords = computeJava(rep);
    var html = applyJavaStyle(allWords);
    var container = document.getElementById('java-viewer');
    // console.log(container);
    container.innerHTML = html;
  })
}

function computeJava (someJava) {
  var allCaracteres = someJava.split('');
  // console.table(allCaracteres);
  var allWords = []
  var word = '';
  for (var i = 0; i < allCaracteres.length; i++) {

    switch (allCaracteres[i]) {
      case '':
      case ' ':
      case '\n':
      case '\r':
      case '(':
      case ')':
      case '[':
      case ']':
      case '"':
      case '\'':
        allWords.push(word);
        word ='';
        allWords.push(allCaracteres[i]);
        break;
      case '.':
        word += allCaracteres[i];
        allWords.push(word);
        word ='';
        // allWords.push(allCaracteres[i]);
        break;
      default:
      word += allCaracteres[i];
      if(i == allCaracteres.length-1){
        allWords.push(word);
      }
    }
  }
  // console.table(allWords);
  return allWords;
}
function applyJavaStyle (allWords) {
  var html = '';
  for (var i = 0; i < allWords.length; i++) {
    var sp = '<span';
    var msp = '>';
    var cl;
    var fsp = '</span>';
    if (allWords[i].match(/.*\./)) {
      console.log('yeah');
    }
    switch (allWords[i]) {
      case ' ':
        cl = ' class="java-espace"';
        break;
      case '\n':
      case '\r':
        cl = ' class="java-saute"';
        break;
        // .kmklmKkmklmK
        // .ijiJkk
      case (allWords[i].match(/\.[^\s]{1,}\S*[A-Z]\S*/) || {}).input:
      //  KomomKomm
      // mOlkhiKklkl
      case (allWords[i].match(/.*\./) || {}).input:
      // .ljhkljkljkl
      case (allWords[i].match(/.*\./) || {}).input:
        cl = ' class="java-key"';
        break;
      case '(':
      case ')':
      case '[':
      case ']':
      case '{':
      case '}':
        cl = ' class="java-symbole"';
        break;
      case '\'':
      case '"':
        cl = ' class="java-text"';
        break;
      case 'true':
      case 'false':
        cl = ' class="java-value"';
        break;
      case '.':
      case '+':
      case '/':
      case '-':
      case '*':
      case '=':
        cl = ' class="java-operator"';
        break;
      case '>':
      case '->':
      case '<-':
          cl = ' class="java-assign"';
        break;
      case 'class':
      case 'public':
      case 'import':
      case 'static':
        cl = ' class="java-class"';
        break;
      case 'args':
        cl = ' class="java-args"';
        break;
      case 'System':
      case 'out':
        cl = ' class="java-function"';
        break;
      case 'String':
      case 'Node':
      case 'void':
      case 'Array':
      case 'Number':
      case 'Double':
      case 'Integer':
      case 'int':
        cl = ' class="java-type"';
        break;
      default:
        cl = ' class="java-other"';

    }
    html += sp + cl + msp + allWords[i] + fsp;
  }
  // document.textContent = html;
  // console.log(html);
  return html;
}
