const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const { route } = require('./auth');

const router = express.Router();
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

//GET all posts
router.get(
	'/posts/all',
	requireLogin,
	(req, res) => {
		Post.find()
			.populate('postedBy', '_id name avatar')
			.exec((error, result) => {
				if (error) res.send({ error });
				else {
					// console.log(result);
					res.json({
						result,
						message : 'posts loaded'
					});
				}
			});
	}
);

//GET loggen in user's posts
router.get(
	'/posts/my-posts',
	requireLogin,
	async (req, res) => {
		try {
			const posts = await Post.find({
				postedBy : req.user._id
			}).populate('postedBy', '_id name');
			res.send({
				posts,
				message : 'posts loaded from db'
			});
		} catch (err) {
			console.log(err);
			res.send({ error: 'error loading posts' });
		}
	}
);
//GET one post by id
router.get(
	'/post/:id',
	requireLogin,
	(req, res) => {
		Post.findById(req.params.id)
		.populate('postedBy', '_id name avatar')
			.then((post) => {
				res.send(post);
				// console.log(post);
			})
			.catch((error) => {
				res.send(error);
			});
	}
);
//GET all posts of a user
//GET posts of following users
router.get(
	'/posts/following',
	requireLogin,
	(req, res) => {
		// console.log(req.user)
		Post.find({
			postedBy: { $in: req.user.following }
		})
			.populate('comments.postedBy', '_id name')
			.populate('postedBy', '_id name avatar')
			.then((result) => {
				// console.log('***********', result);
				res.json({
					result,
					message : 'posts loaded'
				});
			})
			.catch((error) => {
				console.log(error);
				res.send(error);
			});
	}
);
router.get(
	'/posts/:id',
	requireLogin,
	(req, res) => {
		Post.find({ postedBy: req.params.id })
			.then((post) => {
				res.send(post);
				// console.log(post);
			})
			.catch((error) => {
				res.send(error);
			});
	}
);


//GET post form
router.get('/posts/new', (req, res) => {
	res.send('newPostiii');
});

//POST submit new post
router.post(
	'/posts/new',
	requireLogin,
	async (req, res) => {
		const { title, body, photo } = req.body;
		if (!title || !body || !photo)
			return res.send({
				error : 'please fill in all fields!'
			});

		const post = new Post({
			...req.body,
			postedBy : req.user._id,
			postedOn:Date.now()
		});
		try {
			await post.save();
			res.send('post saved to DB!');
		} catch (err) {
			console.log(err);
			res.send({ error: 'DB problems' });
		}
	}
);

// like PUT
router.put(
	'/post/:id/like',
	requireLogin,
	async (req, res) => {
		Post.findByIdAndUpdate(
			req.params.id,
			{
				$push : { likes: req.user._id }
			},
			{ new: true }
		)
		.populate('postedBy', '_id name avatar')
		.exec((error, result) => {
			if (error) res.send({ error });
			else res.send({ result, message: 'liked' });
		});
	}
);

//dislike PUT
router.put(
	'/post/:id/dislike',
	requireLogin,
	async (req, res) => {
		Post.findByIdAndUpdate(
			req.params.id,
			{
				$pull : { likes: req.user._id }
			},
			{ new: true }
		)
		.populate('postedBy', '_id name avatar')
		.exec((error, result) => {
			if (error) res.send({ error });
			else
				res.send({
					result,
					messsage : 'disliked'
				});
		});
	}
);

//delete post DELETE

router.delete(
	'/post/:id/delete',
	requireLogin,
	async (req, res) => {
		Post.findById(
			req.params.id
		).exec((error, post) => {
			if (error || !post)
				return res.send({ error });
			if (
				req.user._id.toString() ===
				post.postedBy.toString()
			) {
				Comment.find({ '_id': { $in: post.comments } })
				.exec((error, comments)=>{
					comments.map((comment)=>comment.remove())
					post
					.remove()
					.then(() => {
						res.send({
							messsage : 'post deleted'
						});
					})
					.catch((error) => console.log(error));
				})
			}
			else {
				// console.log(req.user._id);
				// console.log(post.postedBy);
				res.send({
					message :
						"this is not your post, you can't delete it!"
				});
			}
		});
	}
);

module.exports = router;
