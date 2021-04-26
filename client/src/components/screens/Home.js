import React, {
	useState,
	useEffect
} from 'react';

import Post from '../Post';

import '../../styles/Home.css'

const Home = () => {
	const [ posts, setPosts ] = useState([]);
	const renderPosts = () => {
		
		fetch('/posts/all', {
			headers : {
				Authorization :
					'Bearer ' +
					localStorage.getItem('token')
			}
		})
			.then((res) => res.json())
			.then((result) => {
				// console.log(result);
				setPosts(result.result.reverse());
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
