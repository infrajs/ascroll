$(function(){
	$('.ascroll').click(function () {
		var mark=$(this).attr('href');
		mark=mark.split('#',2);
		mark=mark[1];
		if(!mark)return;
		var el=$('#'+mark);
		if(!el.length)return;
		var top = el.offset().top;
		var delta=90;
		if(top>delta)top=top-delta;
		$('html, body').animate({
			scrollTop:top
		}, 'slow');
		return false;
	});
});