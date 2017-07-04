(function(){
	Event.handler('Controller.onshow', function () {
		var conf = Config.get('ascroll');
		Ascroll(conf);
	});

	
	Event.handler('Crumb.onchange', function () {// это native click Crumb, после jquery click ascroll
		//Нажимаем на ссылку, но infrajs.onshow не происходит. Ссылка с якорем
		if (Crumb.popstate) return; //back forward
		if (Crumb.a&&!location.hash) return; //link click
		if (typeof(infra.scroll) !== 'undefined') {
			Ascroll.once = infra.scroll;
			delete infra.scroll;
		}
		Ascroll.go(location.hash);
		
	});
	domready(function(){
		$(document).scroll(function(){
			var onWheel = function (e) {
			 	if (document.documentElement && document.documentElement.scrollTop) {
					$('html').stop();
				} else {
					$('body').stop();
				}
			}
			if (document.addEventListener) {
			  if ('onwheel' in document) {
			    // IE9+, FF17+, Ch31+
			    document.addEventListener("wheel", onWheel);
			  } else if ('onmousewheel' in document) {
			    // устаревший вариант события
			    document.addEventListener("mousewheel", onWheel);
			  } else {
			    // Firefox < 17
			    document.addEventListener("MozMousePixelScroll", onWheel);
			  }
			} else { // IE8-
			  document.attachEvent("onmousewheel", onWheel);
			}
		});
	});
	
})();
