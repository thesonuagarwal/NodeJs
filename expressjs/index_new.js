
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
    
app.set('view engine', 'pug');
app.set('views','./views');

app.use(upload.array());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieParser()); 
app.use(session({secret: "Your secret key",saveUninitialized:false,resave:false}));
var authentication = require('./authentication');



app.use('/authentication',authentication);

app.listen(3000);