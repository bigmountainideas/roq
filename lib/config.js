var _ = require('underscore');

var baseConfig = {
  cache : true,
  port : 8709
};


module.exports = {
  
  development : _.extend(baseConfig,{
    cache : false
  }),
  
  qa : _.extend(baseConfig,{
    
  }),
  
  
  uat : _.extend(baseConfig,{
    
  }),
  
  
  'pre-production' : _.extend(baseConfig,{
    
  }),
  
  
  production : _.extend(baseConfig,{
    
  }),
};