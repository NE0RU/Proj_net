var express = require('express');
var app = express();
var logger = require('morgan');
var favicon = require('serve-favicon');
var path = require('path');
var main = require('./routes/main');
var signup = require('./routes/signup');

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', main);
app.use('/', signup);

app.listen(8080, function(){
    console.log('8080 포트에서 대기중');
});