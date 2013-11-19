/** @module router */

/**
 * ======== Module dependencies ============ */
var fs = require('fs')
  , path = require('path')
  , i18n = require('./i18n')
  , Template = require('./template')
;






var contentDir = global.roq.options.appRoot + '/app/content'
;





/**
 * ======== Functions ============ */



/**
 * ======== Module methods ============ */


function Pebble(uri, name){
  
  if( uri){
    this.uri = uri;
    this.loadContent();
    this.loadTemplate();
    this.template.setData( this.rawContent);
  }
  
  return this;
};


Pebble.prototype.parse = function(){
  
};


Pebble.prototype.loadTemplate = function(){
  this.template = new Template( this.rawContent.template);
};



Pebble.prototype.loadContent = function(){
  this.rawContent = JSON.parse(
    fs.readFileSync( this.uri,{
      encoding:'utf8'
    })
  );
};


Pebble.prototype.save = function(){
  
};



Pebble.prototype.render = function(){
  return this.template.render( this.rawContent);
};



module.exports = Pebble;

