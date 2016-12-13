var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var app = express();

// 网页模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );


//基础配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//数据库配置
var mongoose = require("mongoose");
global.dbHelper = require( './common/dbHelper' );
global.db = mongoose.connect("mongodb://localhost/test4");

// session配置
var session = require('express-session');
app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));
//异常配置
app.use(function(req, res, next){
    //res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});

//路由配置
require('./routes/index')(app);

module.exports = app;
