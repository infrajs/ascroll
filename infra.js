import { Event } from '/vendor/infrajs/event/Event.js'
import { Ascroll } from '/vendor/infrajs/ascroll/Ascroll.js'
import { Crumb } from '/vendor/infrajs/controller/src/Crumb.js'
import { CDN } from '/vendor/akiyatkin/load/CDN.js'
import { Config } from '/vendor/infrajs/config/Config.js'	

let conf = Config.get('ascroll');
Ascroll(conf);
Event.handler('Controller.onshow', function () {
	let conf = Config.get('ascroll');
	Ascroll(conf);
})

CDN.load('jquery').then(() => {
	document.addEventListener("wheel", async (e) => {
		if (document.documentElement && document.documentElement.scrollTop) {
			$('html').stop()
		} else {
			$('body').stop()
		}
	})
})


Event.handler('Crumb.onchange', function () {// это native click Crumb, после jquery click ascroll
	//Нажимаем на ссылку, но Controller.onshow не происходит. Ссылка с якорем
	if (Crumb.popstate) return; //back forward
	if (Crumb.a && !location.hash) return; //link click
	setTimeout(function () {
		Ascroll.go(location.hash);
	}, 1); //Ждём когда якорь появится на странице
});



