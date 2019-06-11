
// mode
// type
// source
// output
// helper
// lesmodes binary hexadecimal decimal hackertext
var Consolator = {
  console:null,
  text: null,
  mode:'null',
  action:'0',
  titlemode:null,
  titletype:null,
  titlesource:null,
  titleoutput:null,
  titlehelper:null,

  mode_cypher: {
    text:'tape 1 or 2 |ctrl + q to quit',
    command_1:'1-encryption',
    command_2:'2-decryption',
    text_0:'type 1 for encryption or 2 to decryption',
    text_1:'tape / paste the text end press [enter] to encrypte',
    text_2:'tape / paste the encrypted string end press [enter] to decrypte'
  },
  mode_null: {
    text:'type the mode and press [Enter]',
    command_0:'commands',
    command_1:'',
    command_2:'',
    text_0:'type 1 or 2 to begin',
    text_1:'',
    text_2:''
  },
  mode_binary: {
    text:'convert some  decimal or hexadecimal in binary',
    command_1:'1-binfromdec',
    command_2:' 2-binfromhex',
    text_0:'type 1  dec >>  bin or 2 hex >> bin',
    text_1:'tape decimal to change binary',
    text_2:'tape hexadecimale to change in binary'
  },
  mode_decimal: {
    text:'convert some  binary or hexadecimal in decimal',
    command_1:'1-decfrombin',
    command_2:' 2-decfromhex',
    text_0:'type 1  bin >> dec or 2 hex >> dec',
    text_1:'tape binary to change in decimal',
    text_2:'tape hexadecimal to change in decimal'
  },
  mode_hexadecimal: {
    text:'convert some binary or decimal in hexadecimal',
    command_1:'1-hexfromdec',
    command_2:' 2-hexfrombin',
    text_0:'type 1  dec >> hex or 2 bin >> hex',
    text_1:'tape decimale to change in hexadecimal',
    text_2:'tape binary to change in hexadecimal'
  },
  mode_hackertext: {
    text:'tape some text to change it in hacker mode!',
    command_1:'1-text to hackertext',
    command_2:' 2-hackertext to text',
    text_0:'type 1 or 2 to convert text in hackermode',
    text_1:'tape text  and press [Enter]',
    text_2:'tape text to decrypte'
  },
  setTitle: function (title) {
    var ttle = JSEASY.nfoAlphabet.word(title);
    var divTitle = document.getElementById('title');
    ttle = ttle.replace(/\n/g, '<br>');
    ttle = ttle.replace(/\s/g, '&nbsp;');
    divTitle.innerHTML = ttle;
  },
  init: function () {
    console.log('initializing consolator');
    Consolator.setTitle('crypto');
    document.addEventListener('keydown',Consolator.onkeydown)
    Consolator.console = document.getElementById('console');
    // mode
    Consolator.titlemode = document.getElementById('mode');
    // type
    Consolator.titletype = document.getElementById('type');
    // source
    Consolator.titlesource = document.getElementById('source');
    // output
    Consolator.titleoutput = document.getElementById('output');
    // helper
    Consolator.titlehelper = document.getElementById('helper');
	// paste
    document.addEventListener("paste", function(e) {
    // cancel paste
      e.preventDefault();
      // get text representation of clipboard
      var text = (e.originalEvent || e).clipboardData.getData('text/plain');
      // insert text manually
      Consolator.updateConsole(text);
    });
  },
  onkeydown: function (evt) {
    var ctrl = evt.ctrlKey ? evt.ctrlKey : ((evt.keyCode === 17) ? true : false);
    // console.log(evt.key);
    switch (evt.key) {
      case 'F2' :
      case 'F3' :
      case 'F4' :
      case 'F5' :
      case 'F6' :
      case 'F7' :
      case 'F8' :
      case 'F9' :
      case 'F10' :
      case 'F11' :
      case 'Tab' :
      case 'ArrowLeft' :
      case 'ArrowRight' :
      case 'ArrowUp' :
      case 'ArrowDown' :
      case 'Delete' :
      case 'Dead' :
      case 'CapsLock' :
      case 'Escape' :
      case 'AltGraph' :
        evt.stopPropagation();
        evt.preventDefault();
        break;
      case 'F1' :
        Consolator.displayHelp();
        evt.preventDefault();
      case 'F12' :
        break;
      case 'Enter':
        Consolator.validateCommande();
        evt.preventDefault();
        break;
      case 'Alt':
      case 'Shift':
      case 'Control':
        evt.preventDefault();
        break;
      case 'Backspace':
        Consolator.backspace();
        evt.preventDefault();
        break;
      case 'q':
        if (ctrl) {
          console.log('ctrl + q');
          Consolator.setMode('null');
          Consolator.setAction('0');
          evt.stopPropagation();
          evt.preventDefault();
          break;
        }
      case 'c':
        if (ctrl) {
          console.log('ctrl + c');
          Consolator.setHelp("copied to clipboard!");
           JSEASY.copyToClipboard(Consolator.titleoutput.textContent);

          evt.stopPropagation();
          evt.preventDefault();
          break;
        }
        case 'v':
          if (ctrl) {
            console.log('ctrl + v');
            //
            //  var txt = document.execCommand('paste');
            //  console.log(txt);
            //  Consolator.updateConsole(txt);
            // evt.stopPropagation();
            // evt.preventDefault();
            break;
          }
      default:
        Consolator.updateConsole(evt.key);
        evt.preventDefault();

    }

  },
  purgeConsole: function(){
    Consolator.console.textContent = '';
  },
  backspace: function(){
      // Consolator.console.textContent  = Consolator.console.textContent.slice(0, (Consolator.console.textContent[0] == '>')?1:Consolator.console.textContent.length-1);
      Consolator.console.textContent  = Consolator.console.textContent.slice(0, Consolator.console.textContent.length-1);
  },
  updateConsole: function(txt){
    Consolator.console.textContent += txt;
  },
  displayHelp: function(){
    Consolator.purgeConsole();
    console.log('todo displayinghelp')
    Consolator.setHelp(Consolator.mode == 'null' ? Consolator['mode_' + Consolator.mode].text:Consolator['mode_' + Consolator.mode]['text_'+ Consolator.action])
  },
  validateCommande: function () {
    Consolator.text = Consolator.console.textContent;
    switch (Consolator.mode) {
      case 'null':
        console.log('no mode set');
        Consolator.purgeConsole();
        console.log('try to set mode :', Consolator.text);
        switch (Consolator.text) {
          case 'cypher':
              Consolator.setMode('cypher');
            break;
          case 'decimal':
            Consolator.setMode('decimal');
            break;
          case 'hexadecimal':
            Consolator.setMode('hexadecimal');
            break;
          case 'binary':
            Consolator.setMode('binary');
            break;
          case 'hackertext':
            Consolator.setMode('hackertext');
            break;
          case 'press [Enter] to begin':
            Consolator.setHelp('choose a mode');
            break;
          default:
          Consolator.setMode('null');
          Consolator.setHelp(Consolator.text + ' is not a mode');

        }
        break;
      case 'cypher':
        console.log('mode cypher');
        Consolator.purgeConsole();
        Consolator.commandTo(
          function () {
            return JSEASY.cryptoCipherizerEncrypt(Consolator.text);
          },
          function () {
            return JSEASY.cryptoCipherizerDecrypt(Consolator.text);
          }
        );
        break;
      case 'decimal':
        console.log('mode decimal');
        Consolator.purgeConsole();
        Consolator.commandTo(
          function () {
            return JSEASY.decfrombin(Consolator.text);
          },
          function () {
            return JSEASY.decfromhex(Consolator.text);
          }
        );
        break;
      case 'hexadecimal':
        console.log('mode hexadecimal');
        Consolator.purgeConsole();
        Consolator.commandTo(
          function () {
            return JSEASY.hexfromdec(Consolator.text);
          },
          function () {
            return JSEASY.hexfromdec(JSEASY.decfrombin(Consolator.text));
          }
        );
        break;
      case 'binary':
        console.log('mode binary');
        Consolator.purgeConsole();
        Consolator.commandTo(
          function () {
            return JSEASY.binfromdec(Consolator.text);
          },
          function () {
            return JSEASY.binfromdec(JSEASY.decfromhex(Consolator.text));
          }
        );
        break;
      case 'hackertext':
        console.log('mode hackertext');
        Consolator.purgeConsole();
        Consolator.commandTo(
          function () {
            return JSEASY.hackerAlphabet.translate(Consolator.text);
          },
          function () {
            return JSEASY.hackerAlphabet.translate(Consolator.text);
          }
        );
        break;
      default:

    }


  },
  commandTo: function (action1, action2) {
    if (Consolator.action == '0') {
      switch (Consolator.text) {
        case '1':
        case '2':
          Consolator.setAction (Consolator.text);
          // Consolator.action = Consolator.text;
          break;
        default:
          Consolator.setHelp('....1 or 2');
      }
    }else{
      Consolator.setHelp(' ctrl+c to copy the result')
      switch (Consolator.action) {
        case '1':
          console.log(Consolator['mode_' + Consolator.mode]['text_' + Consolator.action]);
          Consolator.titlesource.innerHTML = Consolator.text;
          Consolator.titleoutput.innerHTML = action1();

          break;
        case '2':
          console.log(Consolator['mode_' + Consolator.mode].text);
          Consolator.titlesource.innerHTML = Consolator.text;
          Consolator.titleoutput.innerHTML = action2();
          break;
        default:
        console.log('Consolator.action problem :', Consolator.action);
      }
    }
  },
  setAction: function (action) {
    console.log('set action ' , action);
    Consolator.action = action;
    Consolator.titletype.innerHTML = (action == '0')?'commands': Consolator['mode_'+ Consolator.mode]['command_'+action];
    Consolator.setHelp((action == '0')?'helper':Consolator['mode_'+ Consolator.mode]['text_' + action]);
  },
  setHelp: function (txt) {
    Consolator.titlehelper.innerHTML = txt;
  },
  displayMode: function (mode) {
    var allModes = document.getElementsByClassName('mode');
    for (var i = 0; i < allModes.length; i++) {
      allModes[i].remClass('actif');
    }
    var md = 0;
    switch (mode) {
      case 'cypher':
        md = 0;
        break;
      case 'hackertext':
        md = 1;
        break;
      case 'binary':
        md = 2;
        break;
      case 'decimal':
        md = 3;
        break;
      case 'hexadecimale':
        md = 4;

        break;
      default:

    }
    allModes[md].addClass('actif');
  },
  setMode: function (mode) {
    Consolator.mode = mode;
    Consolator.displayMode(mode);
    if(mode == 'null'){
      Consolator.titlemode.innerHTML = '<h2>' + 'Make a choice' + '</h2>';
      Consolator.titletype.innerHTML = 'commands';
      Consolator.titlehelper.innerHTML = 'helper';
      Consolator.titlesource.innerHTML = '';
      Consolator.titleoutput.innerHTML = '';
      Consolator.action = '0';
      Consolator.mode = 'null';
    } else {
      Consolator.titlemode.innerHTML = '<h2>' + mode + '</h2>';
      Consolator.titletype.innerHTML = Consolator['mode_' + mode]['command_' + 1] + ' ' + Consolator['mode_' + mode]['command_' + 2];
      Consolator.titlehelper.innerHTML = Consolator['mode_' + mode].text;
      Consolator.setHelp(Consolator['mode_'+ Consolator.mode].text);
      //HERE text-invert
    }
    // Consolator.titlemode.innerHTML =
    console.log('setting mode ', mode)
    Consolator.purgeConsole();
  }

}
