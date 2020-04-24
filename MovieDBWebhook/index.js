'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const API_KEY = require('./apiKey');

const server = express();

// Mongo DB
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mycustomers';
var str = "";

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());


/*server.get('/getCustomers', function(req, res){
   
    MongoClient.connect(url, function(err, db) {
       
       
        var cursor = db.collection('customers').find();

        cursor.each(function(err, doc) {

            console.log(doc);

        });

        
    }); 
  res.send('Mongo db invoke');
   
});*/



/*server.route('/CustomerId').get(function(req, res)

    {
        MongoClient.connect(url, function(err, db) {
            var cursor = db.collection('customers').find();
            //noinspection JSDeprecatedSymbols
            cursor.each(function(err, item) {

                if (item != null) {
                    str = str + "    Customer id  " + item._id + "</br>";
                }
            });
            res.send(str);
            db.close();
        });
    });*/


server.get('/', function(req, res){
  res.send('hello world');
});

server.post('/get-movie-details', (req, res) => {
    const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
   
    const reqUrl = encodeURI("http://www.omdbapi.com/?t="+movieToSearch+"&apikey="+API_KEY);
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
        });
        responseFromAPI.on('end', () => {
            const movie = JSON.parse(completeResponse);
            let dataToSend = movieToSearch === 'The Godfather' ? "I don't have the required info on that. Here's some info on 'The Godfather' instead." : "";
            dataToSend += movie.Title + "is a " + movie.Actors + "starer " + movie.Genre + "movie, released in" + movie.Year + ". It was directed by" + movie.Director;

            return res.json({
                speech: dataToSend,
                displayText: dataToSend,
                source: 'get-movie-details'
            });
        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: 'get-movie-details'
        });
    });
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});