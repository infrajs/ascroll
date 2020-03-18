(async () => {
	let CDN = (await import('/vendor/akiyatkin/load/CDN.js')).default
	await CDN.load('jquery');
	Event.handler('Controller.onshow', function () {
		var conf = Config.get('ascroll');
		Ascroll(conf);
	});

	/*window.addEventListener('popstate', () => {
		console.log('popstate')
	});*/

	Event.handler('Crumb.onchange', function () {// это native click Crumb, после jquery click ascroll
		//Нажимаем на ссылку, но infrajs.onshow не происходит. Ссылка с якорем
		if (Crumb.popstate) return; //back forward
		if (Crumb.a&&!location.hash) return; //link click
		if (typeof(infra.scroll) !== 'undefined') {
			Ascroll.once = infra.scroll;
			delete infra.scroll;
		}
		setTimeout(function () {
			Ascroll.go(location.hash);
		},1); //Ждём когда якорь появится на странице
		
	});

	document.addEventListener("wheel", async (e) => {

	 	if (document.documentElement && document.documentElement.scrollTop) {
			$('html').stop();
		} else {
			$('body').stop();
		}
	});
	
})();
