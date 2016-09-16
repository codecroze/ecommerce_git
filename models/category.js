//for mlab databsae
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//the category has name
var CategorySchema = new Schema({
	name: { type: String, unique: true, lowercase: true}
});

module.exports = mongoose.model('Category', CategorySchema);