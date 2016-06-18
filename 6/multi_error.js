//mStartup p206
//순차적으로 미들웨어를 실행하다가 에러가 났을때 에러 핸들러에 의해서 분기 처리되는 모습

var connect = require('connect');

function hello(req, res, next) {
  if (req.url.match(/^\/hello/)) {
    res.end('Hello World\n');
  } else {
    next();
  }
}

var db = {
  users: [
    { name: 'tobi' },
    { name: 'loki' },
    { name: 'jane' }
  ]
};

function users(req, res, next) {
  var match = req.url.match(/^\/user\/(.+)/);
  if (match) {
    var user;
    db.users.forEach(function(tmpUser) {
      if(tmpUser.name === match[1]) {
        user = tmpUser;
      }
    });
    //var user = db.users[match[1]];
    console.log(user);
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    } else {
      var err = new Error('User not found');
      err.notFound = true;
      next(err);
    }
  } else {
    next();
  }
}

function pets(req, res, next) {
  if (req.url.match(/^\/pet\/(.+)/)) {
    foo();
  } else {
    next();
  }
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.setHeader('Content-Type', 'application/json');
  if (err.notFound) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: err.message }));
  } else {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

connect()
  .use(users)
  .use(pets)
  .use(errorHandler)
  .use(hello)
  .listen(3000);
