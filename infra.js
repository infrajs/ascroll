import { Event } from '/vendor/infrajs/event/Event.js'
import { Ascroll } from '/vendor/infrajs/ascroll/Ascroll.js'
import { Crumb } from '/vendor/infrajs/controller/src/Crumb.js'
import { CDN } from '/vendor/akiyatkin/load/CDN.js'
import { Config } from '/vendor/infrajs/config/Config.js'	
import { DOM } from '/vendor/akiyatkin/load/DOM.js'
import { CallFrame } from '/vendor/akiyatkin/waitshow/CallFrame.js'

DOM.done('load', href => {
	let conf = Config.get('ascroll');
	Ascroll(conf);
})


// CDN.on('load','jquery').then(() => {
	
// 	let check = (event) => {
// 		//if (Ascroll.process) 
// 		event.stopPropagation();
// 		event.preventDefault()
// 		console.log(1)
// 		var container = $('html, body')

// 		//Ascroll.timer = new Date().getTime()
// 		console.log(1)
// 		container.stop()
// 	}
// 	//document.addEventListener("wheel", () => CallFrame(check))
// 	document.addEventListener("wheel", check)
// })


Event.handler('Crumb.onchange', function () {// это native click Crumb, после jquery click ascroll
	//Нажимаем на ссылку, но Controller.onshow не происходит. Ссылка с якорем
	if (Crumb.popstate) return; //back forward
	if (Crumb.a && !location.hash) return; //link click
	//if (!location.hash) return; //link click
	
	DOM.once('load').then(()=> {
		Ascroll.go(location.hash);
	}); //Ждём когда якорь появится на странице
});



