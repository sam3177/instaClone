const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
	name        : {
		type     : String,
		required : true
	},
	email       : {
		type     : String,
		required : true
	},
	password    : {
		type     : String,
		required : true
	},
	avatar      : {
		type     : String,
		required : false
	},
	resetToken  : String,
	expireToken : Date,
	followers   : [
		{
			type : ObjectId,
			ref  : 'User'
		}
	],
	following   : [
		{
			type : ObjectId,
			ref  : 'User'
		}
	]
});

mongoose.model('User', userSchema);
