#!/usr/bin/env node

var debug = require('debug')('module:static');
var fs = require('fs');
var path = require('path');
var url = require('url');

module.exports = function(req, res){
	debug('loading static');

	res.header({'Pragma': 'no-cache'});

	var filePath = url.parse(req.url, true);
	try {
		filePath = decodeURIComponent(filePath.path);
	}
	catch (e) {
		res.status(404).end('Static unknown');
		debug(e);
		return;
	}

	if (~filePath.indexOf('\0')) {
		res.status(404).end('Static incorrect');
		return;
	}

	if (filePath.match(/[\.]html$/i)) filePath = filePath.replace(/[\.]html$/i, '.ejs')
	else if (!filePath.match(/[\.]ejs/i)) filePath += '.ejs';

	filePath = path.normalize(path.join(__dirname, filePath));

	if (filePath.indexOf(__dirname) !=0 ) {
		res.status(404).end('Static wrong');
		return;
	}

	fs.stat(filePath, function (err, stats) {
		if (err || !stats.isFile()) {
			res.status(404).end('Static busy: ' + filePath);
			return;
		}
		else {
			res.header({'Content-Type': 'text/html; charset=utf-8', 'Pragma': 'no-cache'});

			res.render('..' + req.url, {'url': req.url});
			//res.end('static');

			fs.readFileSync(filePath);
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