/** @module router */

/**
 * ======== Module dependencies ============ */
var fs = require('fs')
  , path = require('path')
  , _ = require('underscore')
  , format = require('util').format
  
  , modulesDir = global.roq.options.appRoot + '/app/modules'
;




/**
 * ======== Functions ============ */




/**
 * ======== Module methods ============ */


/**
 *
 */
function Module( type, name, renderer, helpers){
  this.name = name;
  this.type = type;
  this.defaultHelpers = helpers;
  this.moduleHelpers = {};
  this.renderer = renderer;
  
  var _modulesPath  = format('%s/%s', modulesDir, type)
    , _view         = format('%s/%s.%s', _modulesPath, 'html', 'hbs')
    , _model        = format('%s/%s.%s', _modulesPath, type, 'peb')
    , _controller   = format('%s/%s.%s', _modulesPath, type, 'js')
  ;
  
  
  this.modulesPath = _modulesPath;
  
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
    console.error( 'unable to load module `%s` with name `%s` from `%s`', type, name, _modulesPath);
  }
  
  return this;
};




/**
 *
 */
Module.prototype.setRenderer = function( renderer){
  this.renderer = renderer;
};



/**
 *
 */
Module.prototype.loadView = function( file){
  if( fs.existsSync(file)){
    return this.view = fs.readFileSync( file, {
                  encoding:'utf8'});
  }else {
    return false;
  }
};



/**
 *
 */
Module.prototype.loadModel = function( file){
  if( fs.existsSync(file)){
    return this.model = fs.readFileSync( file, {
                  encoding:'utf8'});
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
Module.prototype.render = function(data){
  if( this.view){
    try {
      
      this.locals = _.extend(
        data.locals, {
          __modules__ : data.modules
        }
      );
      
      this.data = data;
      this.modules = data.modules;
      
      
      return this.renderer.compile( this.view)
              ( this.locals, {
                helpers : this.defaultHelpers,
                partials : {},
                data : this.locals
              });
    }catch( err){
      console.error( 'unable to compile module `%s` with name `%s`', this.type, this.name);
    }
  }
  return '';
};


 



/**
 *
 */
module.exports = Module;