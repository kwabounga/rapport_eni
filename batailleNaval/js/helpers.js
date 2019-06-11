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
