
const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var multer = require('multer');
var upload = multer();
var app = express();
  

app.use(upload.array());
app.use("/static", express.static(path.join(__dirname, './public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());
app.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: true}));
app.get('/',function(req,res){
    res.cookie("technology","expressjs");
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    }else{
        req.session.page_views = 1;
        res.send('Welcome to this page for the first time!');
    }
    //console.log('Cookies: ', req.cookies);
    
    
}); 

app.get('/clear_cookie', function(req, res){
    res.clearCookie('technology');
    res.send('cookie technology cleared');
 });

app.get('/form', function(req, res){
   res.render('form');
});

var products = require('./products');

var authentication = require('./authentication');

app.use('/authentication',authentication);
 
  


/*app.use('/products',function(req,res,next){
    console.log("A new request received at " + Date.now());
   
    //This function call is very important. It tells that more processing is
    //required for the current request and is in the next middleware function/route handler.
    next();

});*/
  

app.use('/products',products);
app.set('view engine','pug');
app.set('views','./views');
       
     
//Other routes here
app.get('/first_template', function(req, res){
    res.render('first_view');
 });  

 //Other routes here
app.get('/dynamic_template', function(req, res){
    res.render('dynamic_view',{name:"Dynamic Link",url:"http://google.com"});
 });

  //Other routes here
app.get('/components', function(req, res){
    res.render('content');
 });





app.post('/form',function(req,res){
    console.log(req.body);
    res.send("recieved your request!");
})
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
 });


 app.listen(3000);