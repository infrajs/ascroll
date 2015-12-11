<?php
namespace infrajs\ascroll;
use infrajs\event\Event;
use infrajs\view\View;
use infrajs\infra\Infra;

$conf=Infra::config('ascroll');
if (!$conf['ascroll']) return;
Event::handler('onjs', function () {	
	View::js('*ascroll/ascroll.js');
	View::js('*ascroll/infra.js');
});
