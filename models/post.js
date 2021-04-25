const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
	title    : {
		type     : String,
		required : true
	},
	body     : {
		type     : String,
		required : true
	},
	photo    : {
		type     : String,
		required : true
	},
	likes    : [
		{
			type : ObjectId,
			ref  : 'User'
		}
	],
	comments : [
		{
			type : ObjectId,
			ref  : 'Comment'
		}
	],
	postedBy : {
		type : ObjectId,
		ref  : 'User'
	},
	postedOn: Date
});
mongoose.model('Post', postSchema);
