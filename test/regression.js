var roq = require('../')
  , request = require('supertest');
  
  
describe('GET /en_CA', function(){
  it('should respond with 200', function(done){
    request('http://localhost:8709')
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    })
  })
})


describe('GET /404', function(){
  it('should respond with 404', function(done){
    request('http://localhost:8709')
    .get('/404')
    .end(function(err, res){
      res.should.have.status(404);
      done();
    })
  })
})



