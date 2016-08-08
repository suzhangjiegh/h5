var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');


var mongoose = require("mongoose");
global.dbHelper = require( './common/dbHelper' );
global.db = mongoose.connect("mongodb://localhost/test4");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var session = require('express-session');
app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));


// 设定view engine变量，意为网页模板引擎
//app.set('view engine', 'ejs');
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var login = require('./routes/login');
var register=require('./routes/register');
var home =require('./routes/home');
var logout=require('./routes/logout');
var addcommodity=require('./routes/addcommodity');
var cart =require('./routes/cart');

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});

app.use('/', login);
app.use('/register',register);
app.use('/home',home);
app.use('/logout',logout);
app.use('/addcommodity',addcommodity);
app.use('/cart',cart);

module.exports = app;
