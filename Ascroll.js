window.ascroll=function(conf){

	conf = $.extend(ascroll.conf, conf);
	var div=$(conf.div);

	//Чтобы исключить ссылку из обработки скролла нужно добавить атрибут data-ascroll=false
	var a=div.find('a:not(.ascroll):not([data-ascroll=false])');
	//Так как многие плагины используют "#" такую ссылку в технологических целях... такие ссылки игнорируются
	if (conf.global) {
		a.each(function(){
			var href=$(this).attr('href');
			if (!href) return;
			var mark=href.split('#',2);
			if (mark.length==2&&!mark[1]) return; //Только #
			$(this).addClass('ascroll');
		});
	} else { //Только #anchor
		a.each(function(){
			var href=$(this).attr('href');
			if (!href) return;
			var mark=href.split('#',2);
			if (!mark[1]) return;
			$(this).addClass('ascroll');
		});
	}
	a.each(function(){
		if (!$(this).hasClass('ascroll')) return;

		$(this).attr('data-ascroll',true);//.click(function (event) {
		this.addEventListener('click', function(event) {

			var a = this;
			var href = $(a).attr('href');

			if (window.Crumb&&!Crumb.isInternal(href)) return;

			var is = a.getAttribute('infra');
			if (is ==  'false') return;
			var is = a.getAttribute('data-crumb');

			if (is == 'false') return;


			var anchor=$(a).data('anchor'); //Якорь из атрибута
			
			if (!anchor) {
				anchor = href.split('#', 2); //Якорь из ссылки
				anchor = anchor[1];
				if (anchor) {
					href = href[0];
					var nanchor=Number(anchor);
					if(nanchor==anchor){
						anchor=nanchor;
					} else {
						anchor='#'+anchor;
					}
				} else {
					href = false;
				}
			} else {
				href = false;
			}
			ascroll.go(anchor, conf); //Даже когда адрес уже открыт скролить мы всё равно должны
			if (!href && !event.defaultPrevented) { //Добавляется ли адрес в историю? Кто отменил стандартное действие тот и добавил в историю				
				event.preventDefault(); 
				window.history.pushState(null, null, href);
			}
		});
	});
}
window.ascroll.once;
window.ascroll.conf={
	height: '.navbar-fixed-top',
	anchor: 0, //Якорь по умолчанию
	marginBottom: '.space',
	div:'body',
	global:false //false - применяется только к #anchor ссылкам на текущую страницу, true - применяется ко всем ссылкам, скролл будет наверх браузера или согласно параметров указанных в атрибутах.
}
/**
 * 
 *
 *
 **/
window.ascroll.go = function (anchor, conf, cb) {
	conf = $.extend({}, ascroll.conf, conf);
	if (typeof(window.ascroll.once) != 'undefined') {
		conf['anchor'] = window.ascroll.once;
		delete window.ascroll.once;
		if (conf['anchor'] === false) return;
	}
	if (!anchor) anchor=conf.anchor; //Якорь по умолчанию


	if (typeof(anchor)=='string') {
		var el = $(anchor);
		if (!el.length) return;
		if (!el.is(':visible')) el=el.parents(':visible:first');
		var top = el.offset().top;
	} else if (typeof(anchor)=='number') {
		var top=anchor;
	} else {
		top = 0;
	}
	var height=0;

	if (typeof(conf.height) == 'string' && $(conf.height).length) {
		height = $(conf.height).height();
	} else if (typeof(conf.height) == 'number') {
		height = conf.height;
	}
	
	var marginBottom = 20;
	if (typeof(conf.marginBottom) == 'string' && $(conf.marginBottom).length) {
		marginBottom = parseInt($(conf.marginBottom).css('margin-bottom'));
	} if (typeof(conf.marginBottom) == 'number') {
		marginBottom = conf.marginBottom;
	}

	height = height + marginBottom;
	
	if (top > height) top = top - height;
	else top = 0;

	$('html, body').animate({
		scrollTop:top
	}, {
		"duration":"slow",
		"complete":cb
	});
}

window.Ascroll=window.ascroll;
