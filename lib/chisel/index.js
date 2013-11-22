var handlebars = require('handlebars')
  , compile = handlebars.compile
  , express = require('express')
  , fs = require('fs')
;


var chisel = {}
  , views = {
    
    edit : compile( fs.readFileSync( __dirname + '/client/edit.hbs', 'utf-8'))
    
  }
  , roq
;


function parseUrl( url){
  return /^(.+)\/@edit/ig.exec(url)[ 1];
}



chisel.use = function( server, router){

  server.use('/__chisel__/css',   express.static( __dirname + '/client/css'));
  server.use('/__chisel__/fonts', express.static( __dirname + '/client/fonts'));
  server.use('/__chisel__/js',    express.static( __dirname + '/client/js'));

  
  server.get('*/@edit', function(req,res,next){

    var data = {
      page : {
        url : parseUrl(req.url)
      }
    };


    res.send( 
      views.edit( data)
    );
    
  });
  
  
  server.post('*/@edit', function(req,res,next){
    console.log( req.url);
    
    
  });
  
};


module.exports = chisel;