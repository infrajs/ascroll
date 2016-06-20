(function(){
	Event.handler('Infrajs.onshow', function () {
		var conf = infra.config('ascroll');
		ascroll(conf);
	});

	
	Event.handler('Crumb.onchange', function () {// это native click Crumb, после jquery click ascroll
		//Нажимаем на ссылку, но infrajs.onshow не происходит. Ссылка с якорем
		if (infra.Crumb.popstate) return; //back forward
		if (infra.Crumb.a&&!location.hash) return; //link click
		if (typeof(infra.scroll) !== 'undefined') {
			ascroll.once = infra.scroll;
			delete infra.scroll;
		}
		ascroll.go(location.hash);
	});
	
})();