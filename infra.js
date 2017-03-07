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
	
})();
