//related to home page, cart
var router = require('express').Router();
router.get('/', function(req,res){
	res.render('main/home');
});

router.get('/about', function(req,res){
	res.render('main/about');
});

router.get('/home', function(req,res){
	res.render('main/home');
});

router.get('/users', function(req,res){
	User.find({}, function(err,users){
		res.json(users);
	})
})

module.exports = router;