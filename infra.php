<?php
namespace itlife\ascroll;
global $infra;
infra_when($infra,'onjs', function () {
	global $infra;
	$infra['js'] .= $infra['require']('*ascroll/ascroll.js');
});
