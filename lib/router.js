/** @module router */

/**
 * ======== Module dependencies ============ */
var path = require('path')
  , fs = require('fs')
  , bns = ['.peb', '/index.peb']
;

/**
 * ======== Private properties ============ */
var contentDir = global.roq.options.appRoot + '/app/content'
  , routes = {}
;



/**
 * ======== Functions ============ */

/**
 * Resolve content .peb file from URL
 */

function contentForPath( url){
  var urn = contentDir + url;
  for( var n in bns){
    if( isContentAt( urn + bns[ n])){
      return path.resolve(urn + bns[ n]);
    }
  }
  return null;
}


/**
 * Check if there is content .peb file 
 * with a given URN
 */
function isContentAt( urn){
  try{
    if( fs.statSync( urn).isFile()){
      return urn
    }
  }catch( err){}
  return null;
}


/**
 * ======== Module methods ============ */




/**
 * Invalidate a request so it will be 
 * resolved from filesystem on subsequent calls.
 */
module.exports.invalidateRequest = function( req){
  if( routes[ req.url]){
    delete routes[ req.url];
    return true;
  }else {
    return false;
  }
};


/**
 * Get content .peb from a request object.
 */
module.exports.contentFromRequest = function( req){
  if( routes[ req.url]){
    return routes[ req.url];
  }else {
    routes[ req.url] = contentForPath( req.url);
    return routes[ req.url];
  }
};