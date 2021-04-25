const express = require('express');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const router = express.Router();
const Post = mongoose.model('Post');

router.put(
	'/post/:id/comment_add',
	requireLogin,
	(req, res) => {
		const comment = {
			text     : req.body.text,
			postedBy : req.user._id
		};
		Post.findByIdAndUpdate(
			req.params.id,
			{
				$push : { comments: comment }
			},
			{ new: true }
		)
			.populate('comments.postedBy', '_id name avatar')
			.exec((error, result) => {
				if (error) res.send({ error });
				else {
					// console.log(result);
					res.json({
						result,
						message : 'comment added'
					});
				}
			});
	}
);

router.put(
	'/post/:id/comment_delete',
	requireLogin,
	(req, res) => {
		const comment = {
			text     : req.body.text,
			postedBy : req.user._id
		};
		Post.findByIdAndUpdate(
			req.params.id,
			{
				$pull : { comments: comment }
			},
			{ new: true }
		)
			.populate('comments.postedBy', '_id name avatar')
			.exec((error, result) => {
				if (error) res.send({ error });
				else {
					// console.log(result);
					res.json({
						result,
						message : 'comment added'
					});
				}
			});
	}
);

module.exports = router;
