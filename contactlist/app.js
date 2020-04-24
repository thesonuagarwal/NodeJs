// importing module
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

const route = require('./routes/route')
var app =  express();  

// port number
const port = 3000;


//adding middleware - cors
app.use(cors());

//adding body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// static files
app.use(express.static(path.join(__dirname,'public')));


app.use('/api',route);

// testing server
app.get('/',(req,res)=>{
     res.send('Testing server connection');
})

app.listen(port,()=>{
//console.log('server started at port:' + port);
    console.log(`server started at port: ${port}`);
})



// contact to mongo db
mongoose.connect('mongodb://localhost:27017/contactlist');

// on connection
mongoose.connection.on('connected',()=>{
    console.log('connected to database mongodb @ 27017');
});

// on error
mongoose.connection.on('error',(err)=>{
   if(err){
        console.log('error in database connection mongodb @ 27017' + err);
   }
    
});