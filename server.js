#!/usr/bin/env node

var express = require('express');
var server = express();
var domain = require('domain');
var domainServer = domain.create();

server.get('/*', function(req, res, next){
	var r = {
		'/b': '/xxx12',
		'/a': '/zxcvbnm'
	};
	if (req.url in r) res.status(301).header({'Location': r[req.url], 'Pragma': 'no-cache'}).end('Moved Permanently');
	else next();
});

server.get('/xyz', function(req, res){
	if (req.url.match(/[\/].+/)) {
		res.send('1');
	}
	next();
});

server.get('/*', function(req, res){
	res.end('.');
});



module.exports = function(conf){
	server.listen(conf.get('port'));
}
