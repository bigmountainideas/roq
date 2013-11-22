/** @module roq */


/**
 * ======== Module dependencies ============ */

var express = require('express')
  , _ = require('underscore')
  , path = require('path')
  , common = require('./common')


/**
 * ======== Initialize app variables ============ */

  // 
  , config

  //
  , rootPath

  //
  , environment = process.env.NODE_ENV || 'development'

  // create express instance
  , app = express()

  // create functions object
  , fn = {}
;

















/**
 * ======== Configure express ============ */

// config express to trust proxied requests
app.enable('trust proxy');      

// config express to parse request body as json
app.use(express.json());

// config express to allow overriding of methods
app.use(express.methodOverride());





if( environment=='development'){

  var chisel = require( './chisel');
  chisel.use( app);

}








/**
 * ======== Load roq libraries ============ */
var router = require('./router')
  , renderer = require('./renderer')
  , render = renderer.render
;




/**
 * ======== Core route handlers ============ */


/**
 * Setup route handler
 */
app.use(function(req,res,next){
  // request pebble
  var pebble = router.contentFromRequest( req);
  // check if pebble exists
  if( pebble){
    // respond with rendered view
    res.send( 
      render( pebble)
    );
  }else {
    // next handler
    next();
  }
});



/**
 * 404 response
 */
app.use(function(req,res){
  res
  .status(404)
  .send("Page not found.");
});



/**
 * ======== Define private functions ============ */

function setResourcePaths( root){
  rootPath = root;
  router.setPathToContent       ( root + '/app/content');
  renderer.setPathToTemplates   ( root + '/app/templates');
  renderer.setPathToModules     ( root + '/app/modules');
  renderer.setPathToStaticFiles ( root + '/app/static');
  console.info( 'running from %s', root);
};



/**
 * ======== Define public module functions ============ */

fn.use = app.use;

/**
 * @method
 * @constructor
 */
fn.run = function( dir, port, cb){
  //
  if( !config){
    fn.configure();
  }
  //
  port |= config.port;
  //
  setResourcePaths( dir);
  //
  return app.listen( port, function(){
    console.info('listening on port %d', port);
    console.info('success, roq instance started!');
    cb&&cb();
  });
};


/**
 * @method
 * @constructor
 */
fn.static = function(dir){
  // Set path to look for static assets
  app.use(express.static( dir));
};


/**
 * @method
 * @constructor
 */
fn.localize = function( dir){
  i18n = require('./i18n');
  i18n.load( dir);
};


/**
 * @method
 * @constructor
 */
fn.getRootPath = function(){
  return rootPath;
};




/**
 * @method
 * @constructor
 */
fn.configure = function( env, configPath){
  //
  var userConfig
    , defaultConfigs = require('./config')
  ;
  //
  environment = env || environment;  
  //
  try {
    // load application config
    userConfig = require(configPath||'config');
    // merge default configs with app specific
    config = _.extend( defaultConfigs, userConfig);
    // set configuration
    config = config[ environment];
  }
  catch( err){
    // set configuration
    config = defaultConfigs[ environment];
    //
    console.warn('no config file could be loaded. using default configuration.'
                ,'please add your own `config.js` file in the root of your app.');
  }
  //
  console.info( 'in %s mode', environment);
  return config;
};




/**
 * ======== Export module ============ */

module.exports = fn;
