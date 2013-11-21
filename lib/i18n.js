/** @module i18n translation */

/**
 * ======== Module dependencies ============ */
var fs = require('fs')
  , path = require('path')
  , Polyglot = require('node-polyglot')
;



var locales = {}
  
  , getLocales = function(){
    return locales;
  }


  , loadPhrases = function( dir){
    var files = fs.readdirSync(dir)
      , phrases = {}
    ;
    for( var i in files){
      phrases[ 
        path.basename( files[ i], '.json')
      ] = JSON.parse(
            fs.readFileSync( dir + '/' + files[ i], {
              encoding : 'utf-8'
            })
          );
    }
    return phrases;
  }



  , load = function( dir){
    var dirs = fs.readdirSync( dir)
      , locale
    ;
    for( var i in dirs){
      locale = dirs[ i];
      locales[ locale] = new Polyglot({
            phrases : loadPhrases( dir + '/' + dirs[ i]),
            locale : locale
          });
    }
    return locales;
  }
;



module.exports.load = load;
module.exports.loadPhrases = loadPhrases;
