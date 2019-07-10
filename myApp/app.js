var createError = require('http-errors');
var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
var logger = require('morgan');
var bodyParser_post = require('body-parser');       //post 방식 파서
var date = require('date-utils');
var socket = require('socket.io');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var test = require('./routes/test');
var signup = require('./routes/signup');
var signupsuccess = require('./routes/signupsuccess');
var signupfail = require('./routes/signupfail');
var login = require('./routes/login');
var loginfail = require('./routes/loginfail');
var logout = require('./routes/logout');
var info = require('./routes/info');
var board = require('./routes/board');
var boardfail = require('./routes/boardfail');
var addboard = require('./routes/addboard');
var addboardfree = require('./routes/addboardfree');
var viewboard = require('./routes/viewboard');
var viewboardfree = require('./routes/viewboardfree');
var chat = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser_post.urlencoded({ extended: false }));            // post 방식 세팅
app.use(bodyParser_post.json());                                     // json 사용 하는 경우의 세팅
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  key: 'sid', 
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
  }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test',test);
app.use('/signup',signup);
app.use('/signupsuccess',signupsuccess);
app.use('/signupfail',signupfail);
app.use('/login',login);
app.use('/loginfail',loginfail);
app.use('/logout',logout);
app.use('/info',info);
app.use('/board',board);
app.use('/boardfail',boardfail);
app.use('/addboard',addboard);
app.use('/addboardfree',addboardfree);
app.use('/viewboard',viewboard);
app.use('/viewboardfree',viewboardfree);
app.use('/chat',chat);
  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;