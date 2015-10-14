$(function(){
	$('.ascroll').click(function () {
		var mark=$(this).attr('href');
		mark=mark.split('#',2);
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
		
		$('html, body').animate({
			scrollTop:top
		}, 'slow');
		
		return false;
	});
});
