var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var mysql = require('mysql');
var $dbConfig = require('./db')

//mysql连接池
var db = mysql.createPool($dbConfig);

// 引入二级路由
var indexRouter = require('./routes/index');
var users = require('./routes/users/users');
var login = require('./routes/login-out/login');
var upload = require('./routes/upload/upload');
var manager = require('./routes/manager/manager')
var residents = require('./routes/residents/residents')
var activity = require('./routes/activity/activity')
var inform = require('./routes/inform/inform')
var order = require('./routes/order/order')
var test = require('./routes/test/test');
var search = require('./routes/search/search')

var app = express();

// view engine setup(jade模板引擎)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//解决cors跨越问题
app.use(cors());
app.use(logger('dev'));

//传入数据的格式转换
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//访问静态资源
app.use('/static',express.static(path.join(__dirname, 'public')));

//模块路由使用
app.use('/', indexRouter);
app.use('/api/users', users);
app.use('/api/sign', login);
app.use('/api/upload', upload);
app.use('/api/manager', manager);
app.use('/api/residents', residents);
app.use('/api/activity', activity);
app.use('/api/inform', inform);
app.use('/api/order', order);
app.use('/api/test', test);
app.use('/api/search', search)

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
