//the functionality includes in login page ,it retrieves data from login page,data of user
var router = require('express').Router();

var User = require('../models/user');

var passport = require('passport');

var passportConf = require('../config/passport');

//get the data if user logins 
router.get('/login',function(req,res){
	if(req.user) return res.redirect('/');
	res.render('accounts/login',{message:req.flash('loginMessage')});
});

//whenver user success logins redirect it to profile
router.post('/login', passport.authenticate('local-login',{
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true

}));

//it gets json data from mongoDB in postman
//got to db and check userid exists or nor, if exists then render it with user object
router.get('/profile',function(req,res,next){
	User.findOne({_id: req.user._id}, function(err,user){
		if(err) return next(err);
		res.render('accounts/profile', {user: user}); //this can be used to manipulate ejs file
	});

});

router.get('/signup', function(req,res,next){
	res.render('accounts/signup',{
		//error object
		errors: req.flash('errors')
	});
});

router.post('/signup', function(req,res,next){
	//to create an instance of user object taken from user.js file in models directory
	var user = new User();

	//same as in postman
	user.profile.name = req.body.name; //user.profile.name is taken from user.js
	user.password = req.body.password;
	user.email = req.body.email;
	user.profile.picture = user.gravatar();
    
    //mongoose method to find only one doc
	User.findOne({email: req.body.email}, function(err,existingUser){
		if(existingUser){
			//if email is duplicated it will run and redirect to /signup
			//method in server.js
			req.flash('errors', 'Account exists');
			return res.redirect('/signup');
		}else{
			user.save(function(err,user){
				if(err) return next(err);
                //it is adding the session to server and cookie to browser
				req.logIn(user, function(err){
					if(err) return next(err);
					res.redirect('/profile');
				})
			});
		}
	});
});

router.get('/logout', function(req,res,next){
	req.logout();
	res.redirect('/');

});

//it is responding a page
router.get('/edit-profile', function(req,res,next){
	res.render('accounts/edit-profile.ejs', {message:req.flash('success')});

});

//
router.post('/edit-profile', function(req,res,next){
	User.findOne({ _id: req.user._id}, function(err,user){
		if(err) return next(err);
         //if user exists
		if(req.body.name) user.profile.name = req.body.name;
		if(req.body.address) user.address = req.body.address;
        
        //save in database
		user.save(function(err){
			if(err) return next(err);
			req.flash('success', 'Successfully edited your profile');
			return res.redirect('/edit-profile');

		});
	});
});

module.exports = router;