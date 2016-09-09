var router = require('express').Router();

var User = require('../models/user');

router.post('/signup', function(req,res,next){
	//to create an instance of user object taken from user.js file in models directory
	var user = new User();

	//same as in postman
	user.profile.name = req.body.name; //user.profile.name is taken from user.js
	user.password = req.body.password;
	user.email = req.body.email;
    
    //mongoose method to find only one doc
	User.findOne({email: req.body.email}, function(err,existingUser){
		if(existingUser){
			console.log(req.body.email + "Alresdy here");
			return res.redirect('/signup');
		}else{
			user.save(function(err,user){
				if(err) return next(err);

				res.json("New user creted");
			});
		}
	});
});

module.exports = router;