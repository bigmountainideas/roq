/** @module router */

/**
 * ======== Module dependencies ============ */
var path = require('path')
  , fs = require('fs')
  , _ = require('underscore')
  
  , handlebars = require('handlebars')
  
  , Template = require('./template')
  
  , Module = require('./module')
  
  , libqueue = require('./libqueue')
/**
 * ======== Private properties ============ */
  
  , compile = handlebars.compile
  
  , SafeString = handlebars.SafeString
  
  , renderer = {}
  
  , templatesRoot
  
  , modulesRoot
  
  , staticFilesRoot



/**
 * ======== Private properties ============ */
  , queues = {}
;




/**
 * ======== Functions ============ */


/**
 *
 */
var defaultHelpers = {
  
  module : function(type, obj){
    var type = obj.hash.type
      , name = obj.hash.name
      , modules = this.modules || this.__modules__;
    if( modules[ name]){
      var module = new Module( 
                      modules[ name].module,
                      name, 
                      modulesRoot
                  );
      return renderer.renderModule( module, modules[ name]);
    }else {
      console.error( 'data with key `%s` is not set for module `%s`', name, type);
      return '';
    }
  },

  include : function(file, obj){
    return fs.readFileSync( staticFilesRoot + file, {
                      encoding:'utf8'});
  },

  enqueue : function(files, obj){
    this.queue.add( obj.hash.queue, files);
    return '';
  },

  process_queue : function(queue){
    var q = this.queue.process( queue);
    if( !q){
      console.warn( 'attempted to process empty libqueue `%s`', queue);
      return '';
    }
    return q;
  },
  
  debug : function(obj) {
    return [
        "<!-- debug -->",
        "<!--",
        JSON.stringify(this, null, 2),
        "-->",
        "<!-- END debug -->"
      ].join("\r\n");
  }
};














/**
 * ======== Module methods ============ */

renderer.setPathToTemplates = function( dir){
  templatesRoot = dir;
};


renderer.setPathToModules = function( dir){
  modulesRoot = dir;
};


renderer.setPathToStaticFiles = function( dir){
  staticFilesRoot = dir;
};


renderer.template = function( tmpl){
  return new Template( tmpl, templatesRoot);
};




renderer.module = function( peb){
  
};



renderer.renderModule = function( module, data){

  if( module.view){
      try {
      
        module.locals = _.extend(
          data.locals, {
            __modules__ : data.modules
          }
        );
      
        module.data = data;
        module.modules = data.modules;
      
        var view = compile( module.view)
                    ( module.locals, {
                        helpers : defaultHelpers,
                        partials : {},
                        data : module.locals
                      });
        return new SafeString( view);
      }catch( err){
        console.error( 'unable to compile module `%s` with name `%s`', module.type, module.name);
      }
    }
    return '';
};



renderer.render = function( peb){
  
  
  var tmpl = renderer.template( 
                peb.data.template
              )
  ;

  peb.modules = peb.data.modules;
  peb.queue   = libqueue.create();

  return compile( tmpl.view)
            ( peb, {
                helpers : defaultHelpers,
                partials : {},
                data : peb.data
            });
};

module.exports = renderer;