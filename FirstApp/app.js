function sayHello(name){
	console.log("Hello " + name);
}

sayHello("Sonu Agarwal");

const logger = require('./logger');



//logger.log('mesage');

const path = require('path');
var pathObj = path.parse(__filename);
//console.log(pathObj);

const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();


console.log('Total Memory:' + totalMemory);
console.log(`free Memory: ${freeMemory}`);

const fs = require('fs');


const files = fs.readdirSync('./');

console.log(files);

const EventEmitter = require("events");
var emitter = new EventEmitter();


emitter.on("MessageLogged",(arg)=>{

	console.log("Lsitener called for event",arg);
})

emitter.emit("MessageLogged",{id:1,url:"http://test.com"});

const loggerObj = new logger.loggerClass();
loggerObj.on("MessageLoggedEvent",(arg)=>{
	console.log("Logger class event has been called");
})
loggerObj.logMethod("Test Message");

const http = require("http");
const server = http.createServer();

server.on('connection',(socket)=>{
	console.log('new connection');
})
server.listen(3001);

console.log('Listening on server port 3001');



