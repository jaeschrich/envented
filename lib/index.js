// module dependencies
var http = require('http'),
emitter = require('eventemitter2').EventEmitter2,
connect = require('connect'),
url = require('url');

// creates an http server with request events
// takes the same arguments as http.createServer
exports.createServer = function (onRequest) {
	// you don't have to pass onRequest
	if (!onRequest) {
		onRequest = new Function();
	}

	// create a event emitter server
	var server = new emitter({
		wildcard: true,
		delimiter: '::',
		maxListeners: 0
	});

	// returns a new http.Server instance
	var httpd = connect();
	var router = function (req, res, next) {
		var method, path;

		// get the pathname
		path = url.parse(req.url).pathname;

		// get the method
		method = req.method.toLowerCase();

		// emit the event, method::path (eg get::/about)
		// you can pass a custom seporator
		// passing req and res
		server.emit([method, path], req, res);

		// call onRequest
		onRequest(req, res);
	};

	server.listen = function () {
		var s = http.Server(httpd);
		s.listen.apply(s, arguments);
	};

	server.use = function () {
		httpd.use.apply(httpd, arguments);
	};

	server.router = router;

	return server;
};

// alias to createServer
exports.Server = exports.createServer;

for (var middle in connect.middleware){
	exports[middle] = connect.middleware[middle];
}