(function($){
  'use strict';
 
 
  /**
   * Chisel Object/ Controller
   */
  var chisel = Object.create({
    
    
    /**
     *
     */
    init : function(){
      
      this.pageFrame.on('load', function(){
        
        console.log( 'loaded');
        
      });
      
    },
    
    /**
     *
     */
    pageFrame : $('#pageFrame'),
    
    
    /**
     *
     */
    editPanel : $('#editPanel'),
    
    
    
    /**
     *
     */
    ui : {
      
    }
  });
  
  
  /**
   *
   */
  chisel.init();
  
  
  
})(jQuery);