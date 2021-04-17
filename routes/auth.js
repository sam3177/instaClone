const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const {
	jwtSecret,
	API_key
} = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const router = express.Router();
const User = mongoose.model('User');

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth : {
			api_key : API_key
		}
	})
);

// GET signup form
router.get('/signup', (req, res) => {
	res.render('signup');
});

//POST signup form
router.post('/signup', async (req, res) => {
	const {
		name,
		email,
		password,
		imgUrl
	} = req.body;
	// console.log(req.body);
	if (!name || !email || !password)
		return res.send({
			error : 'please fill in all required fields'
		});
	const cryptedPass = await bcrypt.hash(
		password,
		12
	);
	const existing = await User.findOne({ email });
	if (existing)
		return res.send({
			error : 'email already in use!'
		});

	const user = new User({
		name,
		email,
		avatar   : imgUrl,
		password : cryptedPass
	});
	await user.save();
	transporter.sendMail({
		to: email,
		from:'no_reply@insta.com',
		subject:'signup success',
		html:`<h1> Well done, ${name}!</h1><br><h5> Welcome to instagram!</h5>`
	})
	res.send('signup success');
});

//GET login form
router.get('/login', (req, res) => {
	res.render('login');
});

//POST login form
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.send({
			error : 'please fill all fields!'
		});

	let existing = await User.findOne({ email });
	if (!existing)
		return res.send({
			error :
				'this email address is not registered yet!'
		});

	const hashed = await bcrypt.compare(
		password,
		existing.password
	);
	if (!hashed)
		return res.send({
			error : 'incorrect password!'
		});
	const token = jwt.sign(
		{ _id: existing._id },
		jwtSecret
	);
	const {
		_id,
		followers,
		following,
		name,
		avatar
	} = existing;
	res.send({
		token,
		user  : {
			_id,
			followers,
			following,
			name,
			email,
			avatar
		}
	});
});

router.get(
	'/protection-tests',
	requireLogin,
	(req, res) => {
		res.send('loggenIn, protected');
	}
);

module.exports = router;
