$(function(){

   //SyntaxHighlighter
   //---------------
   SyntaxHighlighter.all();

   // form
   // ---------------------------------------------------
   var $form       = $('#generator__form');
   var $item       = $form.find('.generator__form__item');
   var $target     = $('.js-generator__preview__target');
   var $codeTarget = $('.js-generator-code-target');

   var dummyAddress = 'https://example123.com';

   var options = {
      type        : [
         'browser' ,
         'phone' ,
         'tablet' ,
         'desktop' ,
         'laptop'
      ],
      size        : [
         '1x',
         '2x',
         '3x',
         '4x',
         '5x',
         '6x',
         '7x',
         '8x',
         '9x'
      ],
      theme       : [
         'black',
         'white'
      ],
      orientation : [
         'portrait',
         'landscape'
      ]
   }
   var enableCtrlObj = {
      browser : ['type','size','address'],
      phone   : ['type','size','theme','orientation'],
      tablet  : ['type','size','theme','orientation'],
      desktop : ['type','size'],
      laptop  : ['type','size']
   }

   ge_init();

   function ge_init (){
      for(var k in options){
         var target = $('.js-ge-' + k , $form);
         for (var i = 0; i < options[k].length; i++) {
            target.append('<option value="'+options[k][i]+'">'+options[k][i]+'</option>');
         }
      }
      changeMock();
   }

   function changeMock(){
      var opt = {}
      var contentTmp = $target.find('.df-content').html();
      $('.generator__form__item').each(function(i) {
         opt[$(this).attr('name')] = $(this).val();
      });

      $target.removeClass().addClass('generator__preview__target').html(contentTmp).deviceMock(opt);
      enableCtrl(opt.type , enableCtrlObj);
      $codeTarget.val( generateCode(opt , enableCtrlObj) );
   }

   function enableCtrl(nowType , enableObj){
      var myEnable = enableObj[nowType];
      $item.attr("disabled", "disabled");
      setTimeout(function(){
         for (var i = 0; i < myEnable.length; i++) {
            $("[name="+myEnable[i]+"]" , $form ).removeAttr("disabled");
         }
      }, 0);
   }

   function generateCode(nowOpt , enableObj){
      var obj = {};
      var code = "";
      var loopCount = 1;
      for (var i = 0; i < enableObj[nowOpt.type].length; i++) {
         obj[enableObj[nowOpt.type][i]] = nowOpt[enableObj[nowOpt.type][i]];
      }
      code += '<!-- includes -->\n';
      code += '<link rel="stylesheet" type="text\/css" href="path\/to\/assets\/css\/jquery.devicemock.css">\n';
      code += '<script src="jquery.js"><\/script>\n';
      code += '<script src="path\/to\/assets\/js\/jquery.devicemock.1.0.0.js"><\/script>\n';
      code += '\n';
      code += '<!-- element -->\n';
      code += '<div class="your-selector"><!-- something... --></div>\n';
      code += '\n';
      code += '<!-- script -->\n';
      code += '<script type="text\/javascript">\n';
      code += '   $(".your-selector").deviceMock({\n';

      for (prop in obj) {
         if (obj.hasOwnProperty(prop)) {
            code += '      ' + prop + ' : "' + obj[prop] + '"';
         }
         code += ',\n';
         loopCount++;
      }
      code += '      imgPath : "path\/to\/assets\/img/" \/\/ path of asset images';
      code += ',\n';
      code += '      cssPrefix : "df-" \/\/ css namespace ( "df-" is default )';
      code += '\n';
      code += '   });\n';
      code += '<\/script>\n';
      return code;
   }
   $item.change(function(event) {
      changeMock();
   });
});


// UI
// ---------------------------------------------------
$(function(){

   var flg_nav_open = false;
   var $html = $('html');
   var $body = $('body');
   var $uiTrigger = $('.js-ui-trigger');
   var $viewport  = $('.viewport');

   function toggleNav(){
      if(flg_nav_open){
         closeNav();
      } else {
         openNav();
      }
   }

   function openNav (){
      flg_nav_open = true;
      console.log('open');

      // Scroll Off
      $(window).on('touchmove.noScroll', function(e) {
          e.preventDefault();
      });

      $body.removeClass('js-nav-close js-nav-close-end');
      setTimeout(function(){
         $body.addClass('js-nav-open');
      }, 50);
      setTimeout(function(){
         $body.addClass('js-nav-open-end');
      }, 550);
   }

   function closeNav (){
      flg_nav_open = false;

       // Scroll On
      $(window).off('.noScroll');

      console.log('close');
      $body.removeClass('js-nav-open js-nav-open-end');
      setTimeout(function(){
         $body.addClass('js-nav-close');
      }, 50);
      setTimeout(function(){
         $body.addClass('js-nav-close-end');
      }, 550);
   }

   function setCenter ( center , target ){
      target.css({
          'transform-origin':         ' center ' + center + 'px',
          '-webkit-transform-origin': ' center ' + center + 'px'
      });
   }

   $(window).bind("resize load scroll",function(){
      var scrolled = $(window).scrollTop();
      var winH     = $(window).height();
      setCenter( (scrolled + winH/2) , $viewport );
   });

   $uiTrigger.on('click', function(event) {
      event.preventDefault();
      toggleNav();
   });

});