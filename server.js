//for using express it has all the methods like get ,post, put, delete
var express = require('express');

//app is referring to express objects
var app = express();

//it tells the server to response something, get method 
app.get('/name', function(req,res){
	res.json("My name is Shalini");
});

//sending something to server, post method
/*app.post()-to send data to server,app.delete(), app.put()-updating data
*/
app.listen(3000, function(err){
	if(err) throw err;
	console.log("Server is running");
});