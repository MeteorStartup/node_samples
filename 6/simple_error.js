//mStartup p202
//에러가 foo is not defined 와 같이 모든 정보를 보여준다.
var connect = require('connect');
connect().use(function hello(req, res) {
  foo();
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}).listen(3000);