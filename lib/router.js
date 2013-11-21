/** @module router */

/**
 * ======== Module dependencies ============ */
var path = require('path')
  , fs = require('fs')
  
  , Pebble = require('./pebble')
/**
 * ======== Private properties ============ */
  
  , contentPostfixes = [
      '.peb', 
      '/index.peb'
    ]

  , routes = {}
  
  , router = {}
  
  , contentRoot
;



/**
 * ======== Functions ============ */






/**
 * ======== Module methods ============ */



router.setPathToContent = function( dir){
  contentRoot = dir;
};



/**
 * Check if there is content .peb file 
 * with a given URN
 */
router.hasContentAt = function( urn){
  try{
    if( fs.statSync( urn).isFile()){
      return urn
    }
  }catch( err){}
  return false;
}


/**
 * Invalidate a request so it will be 
 * resolved from filesystem on subsequent calls.
 */
router.invalidateRequest = function( req){
  if( routes[ req.url]){
    delete routes[ req.url];
    return true;
  }else {
    return false;
  }
};



/**
 * Resolve content .peb file from URL
 */
router.contentForPath = function( url){
  var urn = contentRoot + url;
  for( var n in contentPostfixes){
    if( router.hasContentAt( urn + contentPostfixes[ n])){
      return path.resolve(urn + contentPostfixes[ n]);
    }
  }
  return null;
};


/**
 * Get content .peb from a request object.
 */
router.contentFromRequest = function( req){
  if( routes[ req.url]){
    return routes[ req.url];
  }else {
    var urn = router.contentForPath( req.url);
    if( urn){
      routes[ req.url] = new Pebble( urn);
      return routes[ req.url];
    }else {
      return false;
    }
  }
};



module.exports = router;
