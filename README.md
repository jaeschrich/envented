#envented
##Event based node.js server framework
##Why
Node.js has a lot of events. The process object has events. HTTP servers have events. Streams have events. Higher-level applications have events. However, you can't really write a web app with events. Node http servers emit events, but they don't emit events based on the **type** of request. For example
```javascript
var server = http.createServer();
server.on('request', function(req, res){
	// do stuff
});
```

Do you do that? Probably not, you probably just do this:

```javascript
var server = http.createServer(function(req, res){
	// do stuff
});
```
Now, those two methods of creating a server are the same. Which means building an actual server out of one or the other is also the same.

##Get to the point

envented lets you do this:
```javascript
var envented = require('envented');

var server = envented.Server() // this accepts an onRequest callback

server.use(server.router); // server is a connect.Server instance. YOU MUST USE THE ROUTER

server.on('get::/', function(req, res){
	res.end("Hi");
});

server.on('post::/form', function(req, res){
	// handle post data
});
```
The event namespacing is courtesy of EventEmitter2. And all your favorite connect middleware is inside of envented.

