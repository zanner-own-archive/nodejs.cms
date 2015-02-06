#!/usr/bin/env node

var debug = require('debug')('module:test');

module.exports = function(req, res){
	debug('loading test: [' + req.url + ']');

	res.header({'Pragma': 'no-cache'});

	res.end('test');
};