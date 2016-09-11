
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy();

//serialize and deserialize
//serialize is the process of translating DS 
//we store it in mongo in a DS
passport.serializeUser(function(user, done){
	done(null, user._id);
});

//to find the user by ID
passport.deserializeUser(function(id,done){
	User.findById(id,function(err,user){
		done(err,user);
	});
});

//middleware
//new instance of localstartegy and pass username password
passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallBack: true
}, function(req,email,password,done){ //to check if email matches
	User.findOne({email: email}, function(err,user){
		if (err) return done(err);

		if(!user){
			return done(null,false, req.flash('login message', 'no user found'));

		}

		if(!user.comparePassword(password)){ //to check the password
			return done(null,false,req.flash('login message', 'oops wrong'));

		}
		return done(null,user);
	});

}));

//custom functions to validate
//to check whether user is login or not
exports.isAuthenticated = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}