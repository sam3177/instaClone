const express = require('express');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const router = express.Router();
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

//PUT add comment thru post
router.put(
	'/post/:id/add-comment',
	requireLogin,
	async (req, res) => {
		const comment = new Comment({
			text     : req.body.text,
			postedBy : req.user._id,
			postedOn : Date.now()
		});
		await comment.save();
		console.log('comment saved');
		Post.findByIdAndUpdate(
			req.params.id,
			{
				$push : { comments: comment._id }
			},
			{ new: true }
		)
			.populate('postedBy', '_id name avatar')
			.exec((error, result) => {
				if (error) {
					console.log(error);
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

//GET find comment by id
router.get(
	'/comment/:id',
	requireLogin,
	(req, res) => {
		console.log(req.params.id);
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

// like PUT
router.put(
	'/comment/:id/like',
	requireLogin,
	(req, res) => {
		console.log(req.params.id);
		Comment.findByIdAndUpdate(
			req.params.id,
			{
				$push : { likes: req.user._id }
			},
			{ new: true }
		)
			.populate('postedBy', '_id name avatar')
			.exec((error, result) => {
				if (error) res.send({ error });
				else {
					console.log(result);
					res.send({
						result,
						messsage : 'disliked'
					});
				}
			});
	}
);

//dislike PUT
router.put(
	'/comment/:id/dislike',
	requireLogin,
	(req, res) => {
		Comment.findByIdAndUpdate(
			req.params.id,
			{
				$pull : { likes: req.user._id }
			},
			{ new: true }
		)
			.populate('postedBy', '_id name avatar')
			.exec((error, result) => {
				if (error) res.send({ error });
				else {
					console.log(result);
					res.send({
						result,
						messsage : 'disliked'
					});
				}
			});
	}
);

//DELETE delete comment
router.delete(
	'/post/:_id/comment/:id/delete',
	requireLogin,
	(req, res) => {
		console.log('8888888')
		Comment.findByIdAndDelete(req.params.id)
			.then((result) => {
				console.log(result);
				Post.findByIdAndUpdate(
					req.params._id,
					{
						$pull : { comments: req.params.id }
					},
					{ new: true }
				)
					.populate('postedBy', '_id name avatar')
					.exec((error, result) => {
						if (error) {
							console.log(error);
							res.send({ error });
						}
						else {
							console.log(result);
							res.json({
								result,
								message : 'comment deleted'
							});
						}
					});
			})
			.catch((err) => {
				console.log(err);
				res.send(error);
			});
	}
);

module.exports = router;
