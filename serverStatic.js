#!/usr/bin/env node

var debug = require('debug')('app:server:static');
var fs = require('fs');
var path = require('path');
var url = require('url');

module.exports = function(req, res)
{
	var filePath = url.parse(req.url, true);
	try {
		filePath = decodeURIComponent(filePath.path);
	}
	catch (e) {
		res.status(404).end('Resource unknown');
		debug(e);
		return;
	}

	if (~filePath.indexOf('\0')) {
		res.status(404).end('Resource incorrect');
		return;
	}

	filePath = path.normalize(path.join(__dirname, filePath));

	if (filePath.indexOf(__dirname) !=0 ) {
		res.status(404).end('Resource wrong');
		return;
	}

	fs.stat(filePath, function (err, stats) {
		if (err || !stats.isFile()) {
			res.status(404).end('Resource busy');
			return;
		}
		else {
			var mime = require('mime').lookup(filePath);
			var file = new fs.ReadStream(filePath);
			res.header({'Content-Type': mime + '; charset=utf-8', 'Pragma': 'no-cache'});
			file.pipe(res);
			file.on('error', function (err) {
				res.status(400).end('Unknown file static error');
				debug(err);
			});
			res.on('close', function () {
				file.destroy();
			});
		}
	});
};