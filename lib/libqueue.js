/** @module router */

/**
 * ======== Module dependencies ============ */
var path = require('path')
  , util = require('util')
;


var queue = Object.create(null)
  , extname = path.extname
  , format = util.format
;


queue.types = {
  css : function(url){
    return format( '<link rel="stylesheet" type="text/css" media="all" href="%s" />', url);
  },
  js : function(url){
    return format( '<script src="%s"></script>', url);
  }
};



queue.add = function(queue_name, files){
  var queueObj = this.queue || queue;
  if( queueObj[ queue_name]){
    queueObj[ queue_name].push( files);
  }else {
    queueObj[ queue_name] = [files];
  }
}

queue.process = function(queue_name){
  var queueObj = this.queue || queue
    , q = queueObj[queue_name]
    , output = []
    , type;
  for( var i in q){
    type = extname( q[ i]).substr(1);
    if( queue.types[ type]){
      output.push( queue.types[ type]( q[ i]))
    }
  }
  return output.join( '\r\n');
};


/**
 * ======== Functions ============ */



/**
 * ======== Module methods ============ */
queue.create = function(){
  var _queue = Object.create(queue);
  this.queue = _queue;
  return _queue;
};



module.exports = queue;