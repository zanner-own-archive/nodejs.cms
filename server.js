#!/usr/bin/env node

var domain = require('domain');
var domainServer = domain.create();
var express = require('express');
var server = express();
server.engine('ejs', require('ejs-locals'));
server.set('views', __dirname + '/templates');
server.set('view engine', 'ejs');

server.get('/*', function(req, res, next){
	require('moduleRedirects')(req, res, next);
});

server.get('/', function(req, res){
	require('moduleFrontpage')(req, res);
});

server.get('/resource(/*)?', function(req, res){
	require('moduleResources')(req, res);
});

server.get('/static(/*)?', function(req, res){
	require('moduleContents')(req, res);
});

server.get('/test(/*)?', function(req, res){
	require('moduleTest')(req, res);
});

server.get('/*', function(req, res){
	var debug = require('debug')('server:unknown');
	debug('loading: [' + req.url + ']');
	res.header({'Pragma': 'no-cache'});
	res.end('.');
});



module.exports = function(conf){
	server.listen(conf.get('port'));
}
