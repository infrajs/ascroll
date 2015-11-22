infra.listen(infrajs, 'onshow', function () {
	var conf = infra.config();
	ascroll(conf.ascroll);
});

infra.listen(infra.Crumb, 'onchange', function () {// это native click Crumb, после jquery click ascroll
	
	if (infra.Crumb.popstate) return; //back forward
	if (infra.Crumb.a) return; //link click

	ascroll.go(location.hash);
});