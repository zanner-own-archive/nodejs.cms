#!/usr/bin/env node

var domain = require('domain'), debug;
var domainApp = domain.create();

domainApp.on('error', function (err) {
	debug('Error: ', err);
});

/**/
domainApp.run(function(){
	debug = require('debug')('app');
	var conf = require('nconf');
	conf.argv().env().file(require('path').join(__dirname, 'config.json'));
	var server = require('server')(conf);
});
/** /
debug = require('debug')('app');
var conf = require('nconf');
conf.argv().env().file(require('path').join(__dirname, 'config.json'));
var server = require('server')(conf);
/**/