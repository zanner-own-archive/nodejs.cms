#!/usr/bin/env node

var debug = require('debug')('module:frontpage');

module.exports = function(req, res){
	debug('loading frontpage');

	res.header({'Pragma': 'no-cache'});

	res.end('front page');

};