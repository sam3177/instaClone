const express = require('express');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const router = express.Router();
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');


//PUT add comment thru post
router.put(
	'/post/:id/comment_add',
	requireLogin,
	async (req, res) => {
		const comment = new Comment({
			text     : req.body.text,
			postedBy : req.user._id,
			postedOn: Date.now()
		});
		await comment.save();
		console.log('comment saved')
		Post.findByIdAndUpdate(
			req.params.id,
			{
				$push : {comments:comment._id}
			},
			{ new: true }
		)
		.populate('postedBy', '_id name avatar')
			.exec((error, result) => {
				if (error) {
					console.log(error)
					res.send({ error });
				}
				else {
					console.log(result);
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

//GET find comment by id
router.get(
	'/comment/:id',
	requireLogin,
	(req, res) => {
		console.log(req.params.id)
		Comment.findById(req.params.id)
			.populate('postedBy', '_id name avatar')
			.then((comment) => {
				console.log(comment);
				res.send(comment);
			})
			.catch((error) => {
				console.log(error);
				res.send(error);
			});
	}
);

module.exports = router;
