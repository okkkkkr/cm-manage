var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入二级路由
var indexRouter = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup(jade模板引擎)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

//传入数据的格式转换
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//访问静态资源
app.use('/static',express.static(path.join(__dirname, 'public')));

//模块路由使用
app.use('/', indexRouter);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误捕获中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
