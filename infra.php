<?php
namespace infrajs\ascroll;
global $infra;
infra_when($infra,'oninitjs', function () {
	global $infra;
	$conf=infra_config();
	if (!$conf['ascroll']['ascroll']) return;
	$infra['js'] .= $infra['require']('*ascroll/ascroll.js');
	$infra['js'] .= $infra['require']('*ascroll/infra.js');
});
