import React, {
	useState,
	useEffect
} from 'react';

import Post from '../Post';
import Comment from '../Comment';

const Home = () => {
	const [ posts, setPosts ] = useState([]);
	const renderPosts = () => {
		fetch('/posts/following', {
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

	let postsR = posts.map((post) => {
		const comms = post.comments.map((c) => (
			<Comment
				key={c._id}
				_id={c._id}
				text={c.text}
				name={c.postedBy.name}
			/>
		));
		return (
			<Post
				key={post._id}
				data={{ ...post, postedBy: '' }}
				postedBy={post.postedBy}
				comms={comms}
				renderPosts={renderPosts}
			/>
		);
	});
	return (
		<div className="centered-container">
			{postsR}
		</div>
	);
};

export default Home;
