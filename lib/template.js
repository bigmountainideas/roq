/** @module router */

/**
 * ======== Module dependencies ============ */
var fs = require('fs')
  , path = require('path')
  , util = require('util')
  , handlebars = require('handlebars')
  , queue = require('./libqueue')
  , Module = require('./module')
;







/**
 *
 */
var templatesDir = global.roq.options.appRoot + '/app/templates'
  , staticFilesDir = global.roq.options.appRoot + '/app/static'
;



/**
 *
 */
var defaultHelpers = {
  
  module : function(obj){
    var type = obj.hash.type
      , name = obj.hash.name
      , modules = this.modules || this.__modules__;
    if( modules[ name]){
      var module = new Module( 
                      modules[ name].module,
                      name, 
                      handlebars, 
                      defaultHelpers 
                  );
      return module.render( modules[ name]);
    }else {
      console.error( 'data with key `%s` is not set for module `%s`', name, type);
      return '';
    }
  },

  include : function(obj){
    return fs.readFileSync( staticFilesDir + obj.hash.file, {
                      encoding:'utf8'});
  },

  enqueue : function(obj){
    this.queue.add( obj.hash.queue, obj.hash.files);
    return '';
  },

  process_queue : function(obj){
    var q = this.queue.process( obj.hash.queue);
    if( !q){
      console.warn( 'attempted to process empty libqueue `%s`', obj.hash.queue);
      return '';
    }
    return q;
  },
  
  debug : function(obj) {
    return [
        "<!-- debug `" + this.name + "` -->",
        "<!--",
        this.type,
        JSON.stringify(obj, null, 2),
        "-->",
        "<!-- END debug -->"
      ].join("\r\n");
  }
};




/**
 * ======= Configure handlebars =========== */

var queues = {}
;





/**
 * ======== Private properties ============ */
var templatesDir
  , modulesDir
;

/**
 * ======== Functions ============ */



/**
 * ======== Module methods ============ */



/**
 *
 */
function Template(name){
  
  this.name = name;
  
  if( name){
    this.load( 
      util.format('%s/%s/%s.%s',templatesDir,name,name,'html')
    );
  }
  
  this.renderer = handlebars;
  this.queue = queue.create();
  
  return this;
};






/**
 *
 */
Template.prototype.setData = function(data){
  this.data = data;
  this.modules = data.modules;
};









/**
 *
 */
Template.prototype.load = function(uri){
  this.tmpl = fs.readFileSync( uri,{
    encoding:'utf8'
  });
};





/**
 *
 */
Template.prototype.cacheRenderedView = function(uri){
  
};


/**
 *
 */
Template.prototype.render = function(data){
  this.data = data;
  this.modules = data.modules;
  return this.renderer.compile( this.tmpl)
          ( this, {
            helpers : defaultHelpers,
            partials : {},
            data : data
          });
};








/**
 *
 */
module.exports = Template;

