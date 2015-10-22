window.ascroll=function(){
	$('a').each(function(){
		var href=$(this).attr('href');
		if(!href)return;
		mark=href.split('#',2);
		if(!mark[1])return;
		$(this).addClass('ascroll');
	})
	$('.ascroll').not('[ascrolled]').attr('ascrolled',true).click(function () {
		var href=$(this).attr('href');
		mark=href.split('#',2);
		mark=mark[1];
		if (mark) {
			var el=$('#'+mark);
			if(!el.length)return;
			var top = el.offset().top;
			var delta=$('.navbar-fixed-top').height();
			if(!delta)delta=0;
			
			var delta2=parseInt($('.space').css('margin-bottom'));
			if(!delta2)delta2=20;
			delta=delta+delta2;
			if(top>delta)top=top-delta;
		} else {
			top=0;
		}
		window.history.pushState(null, null, href);
		$('html, body').animate({
			scrollTop:top
		}, 'slow');
		return false;
	});
}
