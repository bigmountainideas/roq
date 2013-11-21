/** @module router */

/**
 * ======== Module dependencies ============ */
var fs = require('fs')
  , path = require('path')
  , util = require('util')
;

/**
 * ======== Private properties ============ */



/**
 * ======== Functions ============ */



/**
 * ======== Module methods ============ */



/**
 *
 */
function Template( name, dir){
  this.name = name;
  if( name){
    this.view = this.load( 
      util.format(
        '%s/%s/%s.%s', 
        dir, name, name, 'html'
      )
    );
  }
  return this;
};













/**
 *
 */
Template.prototype.load = function(uri){
  return fs.readFileSync( uri, 'utf8');
};







/**
 *
 */
module.exports = Template;

