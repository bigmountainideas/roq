/**


                                  _                ___                     
                                 | |        _     / __)                    
  ____  ___    ____        ____  | |  ____ | |_  | |__  ___    ____  ____  
 / ___)/ _ \  / _  |      |  _ \ | | / _  ||  _) |  __)/ _ \  / ___)|    \ 
| |   | |_| || | | |      | | | || |( ( | || |__ | |  | |_| || |    | | | |
|_|    \___/  \_|| |      | ||_/ |_| \_||_| \___)|_|   \___/ |_|    |_|_|_|
                 |_|      |_|                                              



**/


/**
 * ======== Module dependencies ============ */

var c = require('./lib/common')
  , pkg = require('./package.json')
  , util = require('util')
  , fs = require('fs');



/**
 * ======== Log startup messages ============ */
console.log();
console.log( util.format( fs.readFileSync('STAMP', 'utf8'), pkg.version));


/**
 * ======== Start main module ============ */
module.exports = require('./lib/roq');
