//for using express it has all the methods like get ,post, put, delete
var express = require('express');

//to show the req by the user in server
var morgan = require('morgan');

var mongoose = require('mongoose');

//it will tkae body of your requests and parse it in any way the server wants , post or get
var bodyParser = require('body-parser');

//for rendering web pages
var ejs = require('ejs');

//to create flexible web pages
var engine = require('ejs-mate');

//express uses cookie to store session id
var session = require('express-session');

//parses cookie and puts cookie info in middleware
//it will take the session data encrypt it and pass to browser
var cookieParser = require('cookie-parser');

var flash = require('express-flash');

//to store session in mongodb on server side
var MongoStore = require('connect-mongo')(session);

var passport = require('passport');

//to access data from secret file in config folder
var secret = require('./config/secret');

//to access user.js file in models directory
var User = require('./models/user');

//app is referring to express objects
var app = express();


//secret.database is in sacret.js file in config folder
mongoose.connect(secret.database, function(err){
	if(err) {
		console.log(err);
	}else{
		console.log("Connected");
	}

});

//middlEWARE

//to use steady files
app.use(express.static(__dirname+ '/public'));
app.use(morgan('dev'));

//express app can parse json data format
app.use(bodyParser.json());

//express can parse the data format called x-www-form format
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());

app.use(session({
	resave:true,
	saveUninitialized: true,
	secret: secret.secretKey,
	store: new MongoStore({url:secret.database,autoReconnect:true})
}));

app.use(flash());

//to use ejs-mate engine
app.engine('ejs', engine);

//to set the engine ejs as the engine
app.set('view engine', 'ejs');

//express is using mainRoutes
var mainRoutes=require('./routes/main');

var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);

app.listen(secret.port, function(err){
	if(err) throw err;
	console.log("Server is running");
});