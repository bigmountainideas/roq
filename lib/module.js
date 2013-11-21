/** @module router */

/**
 * ======== Module dependencies ============ */
var fs = require('fs')
  , path = require('path')
  , _ = require('underscore')
  , format = require('util').format
;




/**
 * ======== Functions ============ */




/**
 * ======== Module methods ============ */


/**
 *
 */
function Module( type, name, dir){
  this.name = name;
  this.type = type;
  
  
  var _modulePath  = format('%s/%s', dir, type)
    , _view         = format('%s/%s.%s', _modulePath, 'html', 'hbs')
    , _model        = format('%s/%s.%s', _modulePath, type, 'peb')
    , _controller   = format('%s/%s.%s', _modulePath, type, 'js')
  ;
  
  
  /**
   * Load view 
   */
  this.loadView( _view);
  

  /**
   * Load model 
   */
  this.loadModel( _model);
  

  /**
   * Load controller 
   */
  if( !this.loadController( _controller) 
  &&  !this.view){
    console.error( 'unable to load module `%s` with name `%s` from `%s`', type, name, _modulePath);
  }
  
  
  /**
   *
   */
  if( this.controller){
    if( this.controller.helpers){
      
    }
  }
  
  return this;
};




/**
 *
 */
Module.prototype.loadView = function( file){
  if( fs.existsSync(file)){
    return this.view = fs.readFileSync( file, 'utf8');
  }else {
    return false;
  }
};



/**
 *
 */
Module.prototype.loadModel = function( file){
  if( fs.existsSync(file)){
    return this.model = fs.readFileSync( file, 'utf8');
  }else {
    return false;
  }
};



/**
 *
 */
Module.prototype.loadController = function( file){
  if( fs.existsSync(file)){
    return this.controller = require( file);
  }else {
    return false;
  }
};



/**
 *
 */
module.exports = Module;