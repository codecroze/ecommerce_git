//it makes code more manaegable
//if a function depends on other then we need to sync them 
//orelse the sec function would run ahead of first and cause error
//used for dependable function

//[function,function,function]
var async = require('async');

Category.find({}, function(err, category){
	Product.findOne({category: category._id, function(err,productSingle){

	});
});

async.waterfall([
	//callback is used for calling the next function
	function(callback){
		//for query and pass the category data
		Category.find({}, function(err, category){
			if(err) return next(err);
			callback(null,category)
		});
	},
     
    //category data is passed
	function(category, callback){
		//search for product within the category
		Product.findOne({category: category._id}, function(err, productSingle){
			if(err) return next(err);
			//pass the product found in DB
			callback(null,productSingle)
		});
	},

    //search the spec data of the product in DB
	function(productSingle, callback){
		Product.findById({ _id: productSingle._id}, function(err,product){
			if(err) return next(err);
			res.render('');
			res.redirect


		});
	},

	])