/*
Example

	var test = require('./path/to/test'),
	cake = require('..');
	
	test('eat cake', function(done){
	  cake.eat();
	  done();
	});
	
	test('something that will throw an error', function(done){
	  assert.equal('apples', 'oranges');
	  done();
	});
	test.runTests();
*/

var domain = require("domain");

function done(text){
  console.log("%s: %s", "done".green, text.grey);
	return true;
}

function fail(text, err){
	console.log("%s: %s\n\t%s", "fail".red, text.grey, err.toString().yellow);
}

function test(name, fn){
	test._arr.push({ name: name, fn: fn });
}

test.fail = fail;
test.done = done;
test._arr = [];

test.runTests = function () {
	var arr = this._arr;
	(function runNext(c) {
		var nextIndex = arr.indexOf(c) + 1;
		if (nextIndex === 0) process.exit(0);
		var cur = c.fn;
		var name = c.name;
		var next = arr[nextIndex];
		function ldone() {
			done(name);
			runNext(next);
		}
		var d = domain.create();
		d.on('error', function (err) {
			fail(name, err);
			runNext(next);
		});
		d.run(function () {
			cur(ldone);
		});
	})(arr[0]);
};

module.exports = test;