// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet( url, callback ) {
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
}


// Exécute un appel AJAX POST
// Prend en paramètres l'URL cible, la donnée à envoyer et la fonction callback appelée en cas de succès
// Le paramètre isJson permet d'indiquer si l'envoi concerne des données JSON

// Legere modification de la fonction ajaxPost pour avoir un retour négatif via le callBack pour la condition d'ajout de lien : parametre faculatif
function ajaxPost( url, data, callback, isJson = false ) {
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
  req.addEventListener( "error", function () {
    console.error( "Erreur réseau avec l'URL " + url );
    callback( 'error' );
  } );
  if ( isJson ) {
    // Définit le contenu de la requête comme étant du JSON
    req.setRequestHeader( "Content-Type", "application/json" );
    // Transforme la donnée du format JSON vers le format texte avant l'envoi
    data = JSON.stringify( data );
  }
  req.send( data );
}
