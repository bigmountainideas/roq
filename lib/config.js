var _ = require('underscore');

var baseConfig = {
  cache : true,
  port : 8709,
  paths : {
    'static' : '/app/static',
    'i18n' : '/app/i18n',
    'content' : '/app/content',
    'modules' : '/app/modules',
    'templates' : '/app/templates'
  },
  modules : {
    safeStringRendering : true
  }
};


module.exports = {
  
  test : _.extend(baseConfig,{
    cache : false
  }),
  
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