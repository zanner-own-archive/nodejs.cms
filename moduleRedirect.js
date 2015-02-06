#!/usr/bin/env node

var debug = require('debug')('module:redirect');

module.exports = function(req, res, next){
	var r = require('redirects.json');
	if (req.url in r) {
		debug('loading redirect: [' + req.url + ']');

		res.status(301);
		res.header({'Location': r[req.url], 'Pragma': 'no-cache'});
		res.end('Moved Permanently');
	}
	else next();
};