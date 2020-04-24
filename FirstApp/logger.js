var url = 'http://mylogger.io/log';

const EventEmitter = require("events");


function log(message){
	// send http request
	console.log(message);
}

class loggerClass extends EventEmitter{
	logMethod(msg){
		console.log(msg);
		this.emit("MessageLoggedEvent",{id:1,name:"sonu"});
	}
}

module.exports.log= log
module.exports.endPoint= url
module.exports.loggerClass= loggerClass;
