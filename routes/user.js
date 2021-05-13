const express = require('express');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const router = express.Router();
const User = mongoose.model('User');

router.get(
	'/user/:id',
	requireLogin,
	(req, res) => {
		User.findById(req.params.id)
			.select('-password')
			.then((user) => {
				// console.log(user);
				res.send(user);
			})
			.catch((error) => {
				console.log(error);
				res.send(error);
			});
	}
);

// PUT follow user
router.put(
	'/user/:id/follow',
	requireLogin,
	(req, res) => {
		User.findByIdAndUpdate(
			req.params.id,
			{
				$push : { followers: req.user._id }
			},
			{ new: true }
		)
			.select('-password')
			.exec((error, result) => {
				if (error) res.send({ error });
				else {
					User.findByIdAndUpdate(
						req.user._id,
						{
							$push : {
								following : req.params.id
							}
						},
						{ new: true }
					)
						.select('-password')
						.exec((error, me) => {
							if (error) res.send({ error });
							else {
								res.send({
									result,
									me,
									message : 'user followed'
								});
							}
						});
				}
			});
	}
);

// PUT unfollow user
router.put(
	'/user/:id/unfollow',
	requireLogin,
	(req, res) => {
		User.findByIdAndUpdate(
			req.params.id,
			{
				$pull : { followers: req.user._id }
			},
			{ new: true }
		)
			.select('-password')
			.exec((error, result) => {
				if (error) res.send({ error });
				else {
					User.findByIdAndUpdate(
						req.user._id,
						{
							$pull : {
								following : req.params.id
							}
						},
						{ new: true }
					)
						.select('-password')
						.exec((error, me) => {
							if (error) res.send({ error });
							else {
								res.send({
									result,
									me,
									message : 'user unfollowed'
								});
							}
						});
				}
			});
	}
);

//PUT change profile picture / edit infos
router.put(
	'/user/:id',
	requireLogin,
	(req, res) => {
		User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
			.select('-password')
			.then((user) => {
				// console.log(user);
				res.send({ user });
			})
			.catch((error) => {
				console.log(error);
				res.send(error);
			});
	}
);



module.exports = router;
