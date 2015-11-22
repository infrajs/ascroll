window.ascroll=function(conf){
	if(!conf)conf={};

	conf=$.extend({},{
		div:'body',
		fixed:'.navbar-fixed-top',
		anchor:0, //Якорь по умолчанию
		margin:'.space',
		global:false //false - применяется только к #anchor ссылкам на текущую страницу, true - применяется ко всем ссылкам, скролл будет наверх браузера или согласно параметров указанных в атрибутах.
	},conf);

	var div=$(conf.div);

	//Чтобы исключить ссылку из обработки скролла нужно добавить атрибут data-ascroll=false
	var a=div.find('a').not('.ascroll').not('[data-ascroll=false]');

	//Так как многие плагины используют # такую ссылку в технологических целях... такие ссылки игнорируются
	if (conf.global) {
		a.each(function(){
			var href=$(this).attr('href');
			if (!href) return;
			mark=href.split('#',2);
			if (mark.length==2&&!mark[1]) return; //Только #
			$(this).addClass('ascroll');
		});
	} else { //Только #anchor
		a.each(function(){
			var href=$(this).attr('href');
			if (!href) return;
			mark=href.split('#',2);
			if (!mark[1]) return;
			$(this).addClass('ascroll');
		});
	}

	
	a.filter('.ascroll').attr('data-ascroll',true).click(function (event) {
		console.log('ascroll');
		var href = $(this).attr('href');
		anchor = href.split('#', 2); //Якорь из ссылки
		anchor = anchor[1];
		if (!anchor) {
			anchor=$(this).data('anchor'); //Якорь из атрибута
		} else {
			var nanchor=Number(anchor);
			if(nanchor==anchor){
				anchor=nanchor;
			} else {
				anchor='#'+anchor;
			}
		}

		if (!anchor) {
			anchor=conf.anchor; //Якорь по умолчанию
		}


		if (typeof(anchor)=='string') {
			var el = $(anchor);
			if (!el.length) return;
			var top = el.offset().top;
		} else if (typeof(anchor)=='number') {
			var top=anchor;
		} else {
			top = 0;
		}
		var fixed=0;
		if (typeof(conf.fixed) == 'string') {
			fixed = $(conf.fixed).height();
		} else if (typeof(conf.fixed) == 'number') {
			fixed = conf.fixed;
		}

		
		var margin = 20;
		if (typeof(conf.margin) == 'string') {
			margin = parseInt($(conf.margin).css('margin-bottom'));
		} if (typeof(conf.margin) == 'number') {
			margin = conf.margin;
		}
		fixed = fixed + margin;
		if (top > fixed) top = top - fixed;
		
		var prevented=event.isDefaultPrevented();
		if (!prevented) event.preventDefault();
		if(!prevented&&anchor) {
			window.history.pushState(null, null, href);
		}
		$('html, body').animate({
			scrollTop:top
		}, 'slow');
		
	});
}
