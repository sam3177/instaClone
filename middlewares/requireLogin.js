const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

const User = mongoose.model('User');

module.exports = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization)
		return res.send({
			error : 'no authorization'
		});
	const token = authorization.replace(
		'Bearer ',
		''
	);

	try {
		const payload = await jwt.verify(
			token,
			jwtSecret
		);
		// console.log('####', payload);
		const { _id } = payload;
		const user = await User.findById(_id);
		// console.log("uuuuuuu",user)
		req.user = user;
		next();
	} catch (err) {
		return res.send({
			error : 'wrong token'
		});
	}
};
