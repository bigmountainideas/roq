var app = require('../test_app/app')
  , request = require('supertest')
  , serverURI = 'http://localhost:8709'
  , server
;

describe('GET /en-CA', function(){
  it('should respond with 200', function(done){
    request( serverURI)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    })
  })
})


describe('GET /404', function(){
  it('should respond with 404', function(done){
    request( serverURI)
    .get('/404')
    .end(function(err, res){
      res.should.have.status(404);
      done();
      server.close();
    })
  })
})

