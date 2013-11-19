/** @module common */


/**
 * ======== Module dependencies ============ */
var util = require('util');




/**
 * ======== Console overrides ============ */

console.error = function(){
  console.log('\x1B[31m[ ERROR ]\x1B[39m %s', util.format.apply( this, arguments));
};

console.warn = function(){
  console.log('\x1B[33m[ WARN ]\x1B[39m  %s', util.format.apply( this, arguments));
};

console.info = function(){
  console.log('\x1B[32m[ INFO ]\x1B[39m  %s', util.format.apply( this, arguments));
};

console.line = function(){
  console.log('');
};

console.section = function(){
 console.log('\x1B[22m[ INFO ]\x1B[39m  ', '------------------------------------------------------------------------');
};





/**
 * ======== Common functions ============ */


var fns = {};





/**
 * ======== Export functions ============ */



module.exports = fns;