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
module.exports = router;