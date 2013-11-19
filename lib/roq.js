/** @module roq */


/**
 * ======== Module dependencies ============ */

var express = require('express')
  , c = require('./common')
  , _ = require('underscore')
  , path = require('path')
;




/**
 * ======== Initialize app variables ============ */


// create express instance
var app = express()

// create options object
, options = {}

// create functions object
, fn = {};




options.appRoot = path.dirname( process.argv[1]);
console.info( 'running from %s', options.appRoot);


try {
  // load application config
  var config = require('config');
}
catch( err){

  console.warn('no config file could be loaded. using default configuration.'
              ,'please add your own config.js file in the root of your app.');
  
  // load default config
  var config = require('./config');
}




// set environment
options.environment  = process.env.NODE_ENV||'development';

// set configuration
options.config = config[ options.environment];
console.info( 'in %s mode', options.environment);



// set global shared roq object
Object.defineProperty( global, 'roq', {
  enumerable : true,
  value : {
    options : options
  }
});



/**
 * ======== Configure express ============ */

// config express to trust proxied requests
app.enable('trust proxy');      

// config express to parse request body as json
app.use(express.json());

// config express to allow overriding of methods
app.use(express.methodOverride());

// Set path to look for static assets
app.use(express.static(options.appRoot + '/app/static'));





/**
 * ======== Load roq libraries ============ */
var router = require('./router')
  , Pebble = require('./pebble')
;



/**
 * ======== Define express routes ============ */


/**
 * Setup route handler
 */
app.use(function(req,res,next){
  
  var peb_uri = router.contentFromRequest( req);
  if( peb_uri){
    
    var peb = new Pebble( peb_uri);
    
    res.send( 
      peb.render()
    );
  }else {
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





/**
 * ======== Define public module functions ============ */


/**
 * @method Roq
 * @constructor
 */
fn.start = function( port){
  port |= options.config.port;
  app.listen( port);
  console.info('listening on port %d', port);
};





/**
 * ======== Export module ============ */

module.exports = _.extend({
  options : options
}, fn);


