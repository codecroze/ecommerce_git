//this will be handles by admin , it handles products and categories

var router = require('express').Router();
var Category = require('../models/category');

//it will get page from server
router.get('/add-category', function(req,res,next){
	res.render('admin/add-category',{message: req.flash('success')});
});

//it relies on cat schema
router.post('/add-category'. function(req,res,next){
	var category = new Category();
	category.name = req.body.name; //save data in name field
    
    //if theres an error in saving
	category.save(function(err){
		if(err) return next(err);
		req.flash('success', 'Successfully added a category');
		return res.rediretc('/add-category');
	});
});
