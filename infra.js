import { Event } from '/vendor/infrajs/event/Event.js'
import { Ascroll } from '/vendor/infrajs/ascroll/Ascroll.js'
import { Crumb } from '/vendor/infrajs/controller/src/Crumb.js'
import { CDN } from '/vendor/akiyatkin/load/CDN.js'

Event.handler('Controller.onshow', function () {
	var conf = Config.get('ascroll');
	Ascroll(conf);
});
Event.one('Controller.onshow', function () {
	CDN.load('jquery').then(() => {
		document.addEventListener("wheel", async (e) => {
			if (document.documentElement && document.documentElement.scrollTop) {
				$('html').stop()
			} else {
				$('body').stop()
			}
		})
	})
});
/*window.addEventListener('popstate', () => {
	console.log('popstate')
});*/

Event.handler('Crumb.onchange', function () {// это native click Crumb, после jquery click ascroll
	//Нажимаем на ссылку, но infrajs.onshow не происходит. Ссылка с якорем
	if (Crumb.popstate) return; //back forward
	if (Crumb.a && !location.hash) return; //link click
	if (typeof (infra.scroll) !== 'undefined') {
		Ascroll.once = infra.scroll;
		delete infra.scroll;
	}
	setTimeout(function () {
		Ascroll.go(location.hash);
	}, 1); //Ждём когда якорь появится на странице

});



