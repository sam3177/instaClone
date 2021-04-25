import React, {
	useState,
	useEffect
} from 'react';
// import axios from 'axios';

import Post from '../Post';

const Home = () => {
	const [ posts, setPosts ] = useState([]);
	const renderPosts = () => {
		// axios
		// 	.get('http://localhost:5000/posts/all', {
		// 		headers : {
		// 			Authorization :
		// 				'Bearer ' +
		// 				localStorage.getItem('token')
		// 		}
		// 	})

		// 	.then((res) => {
		// 		console.log(res.data)
		// 		setPosts(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		fetch('/posts/all', {
			headers : {
				Authorization :
					'Bearer ' +
					localStorage.getItem('token')
			}
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setPosts(result.result);
			});
	};
	useEffect(() => {
		renderPosts();
	}, []);

	return (
		<div className="centered-container">
			{posts.map((post) => (
				<Post key={post._id} {...post} renderPosts={renderPosts} />
			))}
		</div>
	);
};

export default Home;
