/** @module router */

/**
 * ======== Module dependencies ============ */
var fs = require('fs')
  , path = require('path')
  , i18n = require('./i18n')
;





/**
 * ======== Functions ============ */



/**
 * ======== Module methods ============ */


function Pebble(uri, name){
  
  if( uri){
    this.uri = uri;
    this.loadContent();
  }
  
  return this;
};


Pebble.prototype.parse = function(){
  
};



Pebble.prototype.loadContent = function(){
  this.data = JSON.parse(
    fs.readFileSync( this.uri,{
      encoding:'utf8'
    })
  );
};


Pebble.prototype.save = function(){
  
};




module.exports = Pebble;

