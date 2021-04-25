const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
	text     : {
		type     : String,
		required : true
	},
   likes:[
      {
			type : ObjectId,
			ref  : 'User'
		}
   ],
	postedBy : {
		type : ObjectId,
		ref  : 'User'
	},
   postedOn:Date
});
mongoose.model('Comment', commentSchema);
