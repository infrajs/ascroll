import { CDN } from '/vendor/akiyatkin/load/CDN.js'
import { Crumb } from '/vendor/infrajs/controller/src/Crumb.js'
import { Event } from '/vendor/infrajs/event/Event.js'

let Ascroll = async (conf) => {
	
	conf = { ...Ascroll.conf, ...conf}
	
	await CDN.on('load', 'jquery')
	var div = $(conf.div)

	//Чтобы исключить ссылку из обработки скролла нужно добавить атрибут data-Ascroll=false
	var a = div.find('a:not(.Ascroll):not([data-Ascroll=false])');
	//Так как многие плагины используют "#" такую ссылку в технологических целях... такие ссылки игнорируются

	a.each(function () {
		var href = this.getAttribute('href');
		if (!href) return;
		var mark = href.split('#', 2);
		if (mark.length == 2 && !mark[1]) return; //Только #
		$(this).addClass('Ascroll');
	});

	a.each(function () {
		if (!$(this).hasClass('Ascroll')) return;

		$(this).attr('data-Ascroll', true); //.click(function (event) {
		this.addEventListener('click', async event => {

			var a = this;
			var href = $(a).attr('href');

			if (!Crumb.isInternal(href)) return;

			var is = a.getAttribute('infra');
			if (is == 'false') return;

			var is = a.getAttribute('data-crumb');
			if (is == 'false') return;


			var anchor = a.dataset.anchor; //Якорь из атрибута
			let hash = false
			if (!anchor) {
				anchor = href.split('#', 2); //Якорь из ссылки
				anchor = anchor[1];
				if (anchor) {
					hash = anchor
					href = href[0];
					var nanchor = Number(anchor);
					if (nanchor == anchor) {
						anchor = nanchor;
					} else {
						anchor = '#' + anchor;
					}
				} else {
					href = false;
				}
			} else {
				href = false;
			}

			//document.body.style.position = 'fixed'
			document.body.style.overflowY = 'scroll'
			document.body.style.width = '100%'


			//DOM.once('load').then(()=> {
			Ascroll.go(anchor, conf, () => {
				document.body.style.overflowY = ''
				//document.body.style.position = ''
				document.body.style.width = ''
			}); //Даже когда адрес уже открыт скролить мы всё равно должны
			//})
			/*document.body.style.overflowY = 'hidden'
			document.body.style.marginRight = '17px'
			DOM.once('load').then(()=> {
				Ascroll.go(anchor, conf, () => {
					document.body.style.overflowY = ''
					document.body.style.marginRight = ''
				}); //Даже когда адрес уже открыт скролить мы всё равно должны
			})*/

			if (hash) {
				DOM.wait('check').then(() => {
					if ('#' + hash != location.hash) return
					Ascroll.go('#' + hash, conf)
				})
			}


			/*if (!href && !event.defaultPrevented) { //Добавляется ли адрес в историю? Кто отменил стандартное действие тот и добавил в историю				
				event.preventDefault();
				window.history.pushState(null, null, href);
			}*/
		});
	});
}
Ascroll.once;
Ascroll.ignore;
Ascroll.conf = {
	height: '.navbar-fixed-top',
	anchor: 0, //Якорь по умолчанию
	duration: "slow",
	easing: "swing",
	marginBottom: '.space',
	div: 'body',
	global: false //false - применяется только к #anchor ссылкам на текущую страницу, true - применяется ко всем ссылкам, скролл будет наверх браузера или согласно параметров указанных в атрибутах.
}
/**
 * 
 *
 *
 **/
Ascroll.topcalc = (anchor, conf) => {
	if (typeof (anchor) == 'string') {
		var el = $(anchor);
		if (el.length) {
			//if (!el.is(':visible')) el = el.parents(':visible:first');
			var top = el.offset().top;
			/*options["step"] = function (now, fx) {
				if (!el.is(':visible')) el = el.parents(':visible:first');
				var top = el.offset();
				if (top) top = top.top;
				else top = 0;
				if (top > height) top = top - height;
				else top = 0;
				fx.end = top;
			}*/
		} else {
			var top = 0;
		}
	} else if (typeof (anchor) == 'number') {
		var top = anchor;
	} else {
		var top = 0;
	}
	var height = 0;

	if (typeof (conf.height) == 'string' && $(conf.height).length) {
		height = $(conf.height).height();
	} else if (typeof (conf.height) == 'number') {
		height = conf.height;
	}

	var marginBottom = 20;
	if (typeof (conf.marginBottom) == 'string' && $(conf.marginBottom).length) {
		marginBottom = parseInt($(conf.marginBottom).css('margin-bottom'));
	} if (typeof (conf.marginBottom) == 'number') {
		marginBottom = conf.marginBottom;
	}

	height = height + marginBottom;

	if (top > height) top = top - height;
	else top = 0
	return top
}
Ascroll.go = (anchor, conf, cb) => {
	conf = { ...Ascroll.conf, ...conf }
	if (typeof (window.Ascroll.ignore) != 'undefined') {
		delete window.Ascroll.ignore;
	}
	if (typeof (window.Ascroll.once) != 'undefined') {
		conf['anchor'] = window.Ascroll.once;
		delete window.Ascroll.once;
		if (conf['anchor'] === false) return;
	}

	if (!anchor) anchor = conf.anchor; //Якорь по умолчанию
	let top = Ascroll.topcalc(anchor, conf)
	let win = document.scrollingElement
	document.documentElement.style.scrollBehavior = 'smooth'
	win.scrollTop = top
	console.log(top)
	let timer = setInterval(() => {
		let t = Ascroll.topcalc(anchor, conf)
		if(t == top) return clearInterval(timer)
		top = t
		win.scrollTop = top
	}, 400)
	if (cb) cb()
}
window.Ascroll = Ascroll;
export { Ascroll };