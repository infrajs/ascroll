import { Event } from '/vendor/infrajs/event/Event.js'
import { Ascroll } from '/vendor/infrajs/ascroll/Ascroll.js'
import { Crumb } from '/vendor/infrajs/controller/src/Crumb.js'
import { CDN } from '/vendor/akiyatkin/load/CDN.js'
import { Config } from '/vendor/infrajs/config/Config.js'	
import { DOM } from '/vendor/akiyatkin/load/DOM.js'
import { CallFrame } from '/vendor/akiyatkin/waitshow/CallFrame.js'

DOM.done('load',() => {
	let conf = Config.get('ascroll');
	Ascroll(conf);
})


CDN.on('load','jquery').then(() => {
	let check = () => {
		if (document.documentElement && document.documentElement.scrollTop) {
			$('html').stop()
		} else {
			$('body').stop()
		}
	}
	document.addEventListener("wheel", async () => CallFrame(check))
})


Event.handler('Crumb.onchange', function () {// это native click Crumb, после jquery click ascroll
	//Нажимаем на ссылку, но Controller.onshow не происходит. Ссылка с якорем
	if (Crumb.popstate) return; //back forward
	if (Crumb.a && !location.hash) return; //link click
	
	setTimeout(function () {
		Ascroll.go(location.hash);
	}, 1); //Ждём когда якорь появится на странице
});



