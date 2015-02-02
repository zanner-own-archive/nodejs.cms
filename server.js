#!/usr/bin/env node

var express = require('express');
var app = express();
//var domain = require('domain');
//var domainSrv = domain.create();

app.get('/*', function(req, res, next){
	var redirects = {
		'/b': '/xxx1'
	};
	console.log(req.url);
	if (req.url in redirects){
		//res.setHeader() status(301).send('Moved Permanently', 'header('HTTP/1.1 301 Moved Permanently');
		//header('Location: /b');');
		res.status(301).header({'Location': redirects[req.url]}).header({'Pragma': 'no-cache'}).send('Moved Permanently');
	}
	else next();
});
/*
app.use(function(err, req, res, next){
	if (req.url.match(/[\/].+/)) {
		res.send('1');
	}
	next();
});

app.use(function(err, req, res, next){
	if (req.url.match(/[\/]/)) {
		res.send('2');
	}
	next();
});
/**/
app.use(function(req, res){
	console.log(req);
	res.end('.');
});


module.exports = function(port){
	app.listen(port);
}
