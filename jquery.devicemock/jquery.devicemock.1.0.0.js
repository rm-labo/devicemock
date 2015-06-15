/**
 * DeviceMock 1.0.0
 * Licensed under MIT
 */
;(function($) {

   $.fn.deviceMock = function(options) {
      var opts = $.extend(true, {}, $.fn.deviceMock.defaults, options);
      this.each(function() {
         var $this   = $(this);
         var content = $this.html();
         setClass( $this , opts);
         setTemplate( $this , createTemplate( $this , opts.type , content , opts ));
      });
   };

   function setClass ($target , obj){
      $target.addClass( obj.cssPrefix + 'frame' );
      for (key in obj) {
         if( obj[key] !== '' || obj[key] !== null || obj[key] !== void 0){
            if( key !== 'address' && key !== 'cssPrefix' && key !== 'imgPath'){
               $target.addClass( obj.cssPrefix + key + '-' + obj[key] );
            }
         }
      }
   }

   function setTemplate( $target , template){
      $target.html(template);
   }

   function createTemplate ($target , mode , content , option){
      var template = '';
      var url = option.address;
      var orientation = option.orientation;
      var theme = option.theme;
      var path   = option.imgPath;
      var prefix = option.cssPrefix;

      if(url === void 0){
         url = '';
      }
      switch(mode) {
         case 'laptop'  :
         case 'desktop' :
            template = '\
               <div class="' + prefix + 'top">\
                  <img src="' + path + mode +'-top.svg">\
               </div>\
               <div class="' + prefix + 'screen">\
                  <div class="' + prefix + 'content">' + content + '</div>\
               </div>\
               <div class="' + prefix + 'bottom">\
                  <img src="' + path + mode +'-bottom.svg">\
               </div>\
               ';
            break;

         case 'tablet' :
         template = '\
               <div class="' + prefix + 'top">\
                  <img src="' + path + 'tablet-' + orientation + '-top.svg">\
               </div>\
               <div class="' + prefix + 'screen">\
                  <div class="' + prefix + 'content">' + content + '</div>\
               </div>\
               <div class="' + prefix + 'bottom">\
                  <img src="' + path + 'tablet-' + orientation + '-bottom-' + theme + '.svg">\
               </div>\
               ';
            break;

         case 'phone'  :
            template = '\
               <div class="' + prefix + 'top">\
                  <img src="' + path + 'phone-' + orientation + '-top.svg">\
               </div>\
               <div class="' + prefix + 'screen">\
                  <div class="' + prefix + 'content">' + content + '</div>\
               </div>\
               <div class="' + prefix + 'bottom">\
                  <img src="' + path + 'phone-' + orientation + '-bottom-' + theme + '.svg">\
               </div>\
               ';
            break;

         case 'browser' :
         default :
            template = '\
               <div class="' + prefix + 'top">\
                  <div class="' + prefix + 'top-bar">' + url + '</div>\
                  <img src="' + path + 'browser-buttons.svg">\
               </div>\
               <div class="' + prefix + 'screen">\
                  <div class="' + prefix + 'content">' + content + '</div>\
               </div>\
               <div class="' + prefix + 'bottom"></div>\
               ';
            break;
      }
      return template;
   }

   // default options
   $.fn.deviceMock.defaults = {
      type        : 'browser',                  // browser , phone , tablet , desktop , laptop
      size        : '3x',                       // null(1x) , 2x , 3x , 4x , 5x
      theme       : 'black' ,                   // black , white (if phone or tablet)
      orientation : 'portrait' ,                // landscape , portrait (if phone or tablet)
      address     : '',                         // (if browser)
      imgPath     : './jquery.devicemock/img/', // path of asset img dir
      cssPrefix   : 'df-'                       // css namespace
   };

})(jQuery);