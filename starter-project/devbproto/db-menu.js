var script = document.createElement( 'script' );
script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
document.head.appendChild(script);

script.onload = function () {

    var $db = jQuery.noConflict();
    console.log('loaded');

    var css = '<style type="text/css">#db-menu{ position: absolute; left:0; top:25%;background:#333;padding:5px;border-radius:0 5px 5px 0; z-index: 10000 } #db-menu .db-inner{ border-right:#5C5C5C double 3px;width: 45px; padding: 35px 10px 0 10px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZVJREFUeNq0VcGNgzAQJKcrAEUpgBKQaMCRUgAlUIIfSDyPDtA983I6cAlcAUjcP5HIn4dL8O1EhhiLJOYURlqBzWpnd7xrNsFyMGPAlez0zPlzafSyLBH8yyx/aH0K3gmtdanvqF/5fwQrw0ciO8v92wnqumZj9P00/uVyieghyWKz9Uv2jbNZovkI9wy6rtNSyttzeGeMwa96C8EjVFUFX74aAVAUhZqLl5G1iGNMeRC0ZClZRjb6K6W0NZA3iCzLdNu22nZ6QQCH0Ko2dshHAi6EeFk2MrIJmqaBDKGV5DwBjXvnoysFhBTcrnC320HSFPImSaLmCCK02IymEdmkrDzPpdm/O5OkaZpqyOtIqsbL65FuQN/346Ggz41MwqNgPhwMc3S2+zc8Ho+TtA6Hg2KYJrrongQXD3udcw4SOJTb7bZzOwlraI3v5/OZGyI4QWfpKjAQTLJBR5F02jmbCQm+oxLfaY09NG1n9uIld05qT+Kcps60iv/8rULT59LIVrmaWu0b+sTcmBtgNaz+y/wTYADi1YkoS+PXOQAAAABJRU5ErkJggg==) 10px 6px no-repeat; } #db-menu ul{ display:none; margin: 0;padding: 0 8px 5px 0;list-style: none; font-size: 12px;} #db-menu > div.active{ width: auto;} #db-menu > div.active ul{ display:block;} #db-menu li{ border: none; border-top:#4D4D4D dotted 1px;padding:0; } #db-menu ul a{ font-size: 12px;color: #ccc;display: block; padding: 4px 0 6px; font-family: arial, sans-serif;line-height: 1.3em;white-space: nowrap;} #db-menu ul a:hover{ color: #FC333B;text-decoration: none;} #db-menu .child{margin: 0 10px 20px 10px; padding: 0;} #db-menu .child li{padding-left: 5px; border-left:#4D4D4D dotted 1px; border-top: none; border-bottom:#4D4D4D dotted 1px;} #db-menu .active a, #db-menu .child .active a{color: #FC333B} #db-menu .active ul a{color: #ccc;} @media only screen and (min-device-width: 769px) { #db-menu:hover .db-inner{ width: auto;} #db-menu:hover ul{ display: block;} }</style>';
    $db('head').append(css);

    var url = window.location.pathname,
        context = 'nav',
        className = 'active',
        dbMenu = '#db-menu';
    $db('.active', context).removeClass(className);
    $db('.active', dbMenu).removeClass(className);
    $db('[href="' + url + '"]', context).addClass(className);
    $db('[href="' + url + '"]', dbMenu).parents('li').addClass(className);

    var menu = [
        '<div id="db-menu">',
        '   <div class="db-inner">',
        '       <ul>',
        '           <li><a href="/">Home</a></li>',
        '           <li><a href="/styleguide/">Style Guide</a></li>',
        '       </ul>',
        '   </div>',
        '</div>'
    ];

    $db('body').append(menu.join(''));
    $db('#db-menu').click(function () {
        $db('.db-inner', this).toggleClass('active');
    });

    $db(document).bind('keydown', function (e) {
        if (e.which == 81) {
            $db('#db-menu').toggle();
        } //key code 81 is letter 'q'
    });

};

