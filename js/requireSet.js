// console 
if (!window.console) {
    window.console = {
        log : function(){},
        dir : function(){}
    };
} else if (!window.console.dir){
    window.console.dir = function(){};
}

/* setting - global */
var setting = {
    win : window,
    doc : document,
    body : document.getElementsByTagName('body'),
    html : document.getElementsByTagName('html'),
    ieV : document.documentMode,
    cssTransition : (function(style){
        var prefixes = ['t','WebkitT','MozT','MsT'];
        for(var i=0, l=prefixes.length; i < l; i++ ) {
            if( typeof style[prefixes[i] + 'ransition'] !== 'undefined')
                return true;
        }
        return false;
    })(document.createElement('div').style),
    mobile : (/Mobile|iPhone|iPod|Android/i).test(navigator.userAgent) // mobile check true, false
};

/* setting - require */
var require = {
    baseUrl : '././js/',
    paths : {
            'jquery' : 'jquery-1.11.1.min',
			'bxSlider' : 'libs/jquery.bxslider.custom',
    		'scriptUi' : 'script.ui.common',
			'fixto' : 'libs/jquery.fixto',
			'twentytwenty' : 'libs/jquery.twentytwenty',
			 'eventmove' : 'libs/jquery.event.move',
			'lazyload' : 'libs/jquery.lazy.min'
    },
    shim : {
    		'ie8support' : ['selectivizr','respond','placeholder'],
			'bxSlider' : ['jquery'],
			'twentytwenty' : ['jquery', 'eventmove'],
    		'respond' : ['selectivizr']
    },
    waitSeconds : 15
    //, urlArgs : 'ts=' + (new Date()).getTime()
}

if(setting.mobile){

	$(setting.html).removeClass('web').addClass('mobile');

            
            function getViewportWidth() {
                if (window.innerWidth) {
                    return window.innerWidth;
                }
                else if (document.body && document.body.offsetWidth) {
                    return document.body.offsetWidth;
                }
                else {
                    return $(window).width();
                }
            }
            
            var viewportWidth = $(window).width();
            if((/fireFox/i).test(navigator.userAgent)){
                viewportWidth = getViewportWidth();
            }

	/*pad check*/
        try{
	if(viewportWidth > 767 && viewportWidth != 0) {
		$(setting.html).removeClass('mobile').addClass('pad web');

		//var padViewPort = $('meta[name=viewport').attr('content','width=1024px, user-scalable=yes, initial-scale=1.0, maximum-scale=3.0');

                    var viewPortTag=document.createElement('meta');
                    viewPortTag.id="viewportMobile";
                    viewPortTag.name = "viewport";
                    viewPortTag.content = "width=1024px; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;";
                    document.getElementsByTagName('head')[0].appendChild(viewPortTag);

		var ww = Math.min(viewportWidth,window.screen.width); //get proper width
		var ratio =  ww / 768; //calculate ratio ( 768 is min width of site)
		if( ratio < 1 ) { //smaller than minimum size
			$(viewPortTag).attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + ww);
		} else { //regular size
			$(viewPortTag).attr('content', 'initial-scale=' + ww/1024+ ', maximum-scale=1, minimum-scale=0.5, user-scalable=yes, width=' + ww);
		}
	    setting.mobile = false;
	    setting.pad = true;
	}
        }
        catch(e){
            //alert(e)
        }
}