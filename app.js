#!/usr/bin/env node

var domain = require('domain');
var domainApp = domain.create();
var debug;
domainApp.on('error', function (err) {
	debug('Error: ', err);
});

/** /
domainApp.run(function(){
	debug = require('debug')('app');
	var port = 4000;
	debugger;
	var server = require('server')(port);
});
/**/

debug = require('debug')('app');
var port = 4000;
debugger;
var server = require('server')(port);
