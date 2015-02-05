#!/usr/bin/env node

var debug = require('debug')('app:server');
var domain = require('domain');
var domainServer = domain.create();
var express = require('express');
var fs = require('fs');
var path = require('path');
var server = express();
var url = require('url');

server.get('/*', function(req, res, next){
	debug('loading uri: [' + req.url + ']');
	var r = require('redirects.json');
	if (req.url in r) res.status(301).header({'Location': r[req.url], 'Pragma': 'no-cache'}).end('Moved Permanently');
	else next();
});

server.get('/static/*', function(req, res){
	res.header({'Pragma': 'no-cache'});
	require('serverStatic')(req, res);
});

server.get('/', function(req, res){
	res.header({'Pragma': 'no-cache'});
	//require('moduleFrontPage')(req, res);
	res.end('frontpage');
});

server.get('/test', function(req, res){
	res.header({'Pragma': 'no-cache'});
	//require('moduleFrontPage')(req, res);
	res.end('test');
});

server.get('/*', function(req, res){
	res.header({'Pragma': 'no-cache'});
	res.end('.');
});



module.exports = function(conf){
	server.listen(conf.get('port'));
}
