#!/usr/bin/env node

var express = require('express');
var server = express();
var debug = require('debug')('app:server');
var domain = require('domain');
var domainServer = domain.create();

server.get('/*', function(req, res, next){
	debug(req.url);
	var r = require('redirects.json');
	if (req.url in r) res.status(301).header({'Location': r[req.url], 'Pragma': 'no-cache'}).end('Moved Permanently');
	else next();
});

server.get('/public/*', function(req, res){
	res.header({'Pragma': 'no-cache'});
	res.send('public');
});

server.get('/*', function(req, res){
	res.header({'Pragma': 'no-cache'});
	res.end('.');
});



module.exports = function(conf){
	server.listen(conf.get('port'));
}
