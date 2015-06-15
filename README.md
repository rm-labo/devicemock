# jquery.devicemock.js

## Demo
Demo is <a href="http://rm-labo.com/labo/devicemock/" target="_blank">here</a>.

## Usage
Import libraries.

    <link rel="stylesheet" type="text/css" href="path/to/assets/css/jquery.devicemock.css">
    <script src="jquery.js"></script> <!--  v1.5.0〜 -->
    <script src="path/to/assets/jquery.devicemock.js"></script>

Your basic markup and JavaScript should look like this.

    <div class="selector">
       <!-- some contents  (div , img , iframe ...) -->
    </div>

    $('.selector').deviceMock({
       type        : 'browser',   // browser , phone , tablet , desktop , laptop
       size        : '1x',        // null(1x) , 2x , 3x , 4x , 5x
       theme       : 'black' ,    // black , white (if phone or tablet)
       orientation : 'portrait' , // landscape , portrait (if phone or tablet)
       address     : 'http://example123.com' // show on URL BAR
    });


You can custmize path of asset img dir and css prefix. The following is the default value.


    $('.selector').deviceMock({
       //・・・・
       imgPath     : './jquery.devicemock/img/', // path of asset img dir
       cssPrefix   : 'df-'                       // css namespace
    });


Multiple installation example with data attribute.

    <!-- browser -->
    <div style="width:300px;" data-devicemock-type="browser" data-devicemock-size="2x" data-devicemock-theme="" data-devicemock-orientation="" data-devicemock-address="http://example123.com">
       <img src="path/to/img.jpg">
    </div>

    <!-- tablet -->
    <div data-devicemock-type="tablet" data-devicemock-size="4x" data-devicemock-theme="black" data-devicemock-orientation="landscape" data-devicemock-address="">
       <div>
          <!-- some inner contents (div , img , iframe ...) -->
       </div>
    </div>

    $('[data-devicemock-type]').each(function(i){
       var that = this;
       var opt  = {};
       var object = [
                   'type',
                   'size',
                   'theme',
                   'orientation',
                   'address'
                ];
       for (prop in object) {
          var data = $(that).data('dm-'+object[prop]);
          if (object.hasOwnProperty(prop)) {
             opt[object[prop]] = data;
          }
       }
       $(that).deviceMock(opt);
    });

##Available Options

<table>
  <thead>
     <tr>
        <th>Parameter</th>
        <th>Type</th>
        <th>Default value</th>
        <th>Description</th>
     </tr>
  </thead>
  <tbody>
     <tr>
        <th>type</th>
        <td>string</td>
        <td>browser</td>
        <td>
           Could be<br>
           <strong>browser</strong>,
           <strong>phone</strong>,
           <strong>tablet</strong>,
           <strong>desktop</strong>,
           or
           <strong>laptop</strong>
        </td>
     </tr>
     <tr>
        <th>size</th>
        <td>string</td>
        <td>3x</td>
        <td>
           Could be<br>
           <strong>1x</strong>,
           <strong>2x</strong>,
           <strong>3x</strong>,
           〜
           <strong>9x</strong>
        </td>
     </tr>
     <tr>
        <th>theme</th>
        <td>string</td>
        <td>black</td>
        <td>
           only when type is phone or tablet.<br>
           <br>
           Could be<br>
           <strong>black</strong>
           or
           <strong>white</strong>
        </td>
     </tr>
     <tr>
        <th>orientation</th>
        <td>string</td>
        <td>portrait</td>
        <td>
           only when type is phone or tablet.<br>
           <br>
           Could be<br>
           <strong>black</strong>
           or
           <strong>white</strong>
        </td>
     </tr>
     <tr>
        <th>address</th>
        <td>string</td>
        <td><span>none</span></td>
        <td>
           only when type is browser.<br>
           <br>
           example : 'http://example.com'<br>
        </td>
     </tr>
     <tr>
        <th>imgPath</th>
        <td>string</td>
        <td>./jquery.devicemock/img/</td>
        <td>
           path of asset img dir<br>
           <br>
           example : './assets/img/'<br>
        </td>
     </tr>
     <tr>
        <th>cssPrefix</th>
        <td>string</td>
        <td>df-</td>
        <td>
           css namespace<br>
           <br>
           Please refer to the scss file if you want to change.<br>
           -&gt; $prefix : '.df-'; <br>
        </td>
     </tr>
  </tbody>
</table>