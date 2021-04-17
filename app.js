const express = require('express');
const { mongoURI } = require('./config/keys');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect(mongoURI, {
	useNewUrlParser    : true,
	useUnifiedTopology : true
});
mongoose.connection.on('connected', () => {
	console.log('yeah, baby! CONNECTED to DB!!');
});
mongoose.connection.on('error', (err) => {
	console.log('oh, noo! DB error', err);
});

require('./models/user');
require('./models/post');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

app.use(express.json());
//ROUTES;
app.use(authRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(userRoutes);

// app.get('/', (req, res) => {
// 	res.send('welcome');
// });

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(
				__dirname,
				'client',
				'build',
				'index.html'
			)
		);
	});
}

app.listen(process.env.PORT || 5000, () =>
	console.log('server started')
);
