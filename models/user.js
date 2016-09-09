//it is in models folder which will store all the schemas like user schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

//The user schema attributes / char./ fileds
var UserSchema = new mongoose.Schema({
	email: {type: String, unique: true, lowercase: true},
	password:String,

	profile:{
		name: {type: String, default: ''},
		picture: {type: String, default: ''}

	},

	address: String,
	history:[{
		date: Date,
		paid:{type: Number, default:0},
		//item:{type: Schema.Types.ObjectID, ref:''}
	}]
});

/*var user = new User();
user.email = ""
user.profile.name*/

//Hash the password before we save in DB
//pre save it before adding it to DB
//this refres to UserSchema
//Salt is random data created b genSalt
UserSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err,hash){
			if(err) return next(err);
			user.password = hash;
			next();
		});

	});

});


//compare password in the DB and the one that user types in
//methods.comparePassword is a custom function
UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

//to export thr whole Schema so that other files can use it
module.exports = mongoose.model('User', UserSchema);
