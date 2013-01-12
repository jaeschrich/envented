var envented = require('..'),
assert = require('assert').equal,
colors = require('colors'),
test = require('./testr'),
request = require('superagent');

var app = envented.Server();

app.use(envented.bodyParser());
app.use(app.router);

app.on('get::/', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("Hi");
});

app.on('get::/test', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("Test");
});

app.on('post::/post', function (req, res) {
	res.writeHead(200,  {'Content-Type': 'text/plain'});
	res.end('Hi ' + req.body.name);
});

app.listen(8080);

test('GET /', function (done) {
	request.get('127.0.0.1:8080/', function (err, res) {
		if (err) throw err;
		assert(res.status, 200);
		assert(res.text, 'Hi');
		done();
	});
});

test('GET /test', function (done) {
		request.get('127.0.0.1:8080/test', function (err, res) {
			if (err) throw err;
			assert(res.status, 200);
			assert(res.text, 'Test');
			done();
		});
});

test('POST /post (with middleware)', function (done) {
	request
		.post('127.0.0.1:8080/post')
		.send({'name': 'Bob'})
		.end(function (err, res) {
			if (err) throw err;
			assert(res.status, 200);
			assert(res.text, 'Hi Bob');
			done();
		});
});

test.runTests();
