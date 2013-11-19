/** @module i18n translation */

/**
 * ======== Module dependencies ============ */
var fs = require('fs')
  , path = require('path')
  , Polyglot = require('node-polyglot')
;









function loadLocale( dir){
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





var localeDir = global.roq.options.appRoot + '/app/i18n'
  , locales = fs.readdirSync( localeDir)
  , locale
;
for( var i in locales){
  locale = locales[ i];
  locales[ locale] = new Polyglot({
        phrases : loadLocale( localeDir + '/' + locales[ i]),
        locale : locale
      });
}

module.exports = locales;
