import React, {
	useEffect,
	useState
} from 'react';
import { useParams } from 'react-router-dom';

import Post from '../Post';
import axios from 'axios';

const SinglePost = () => {
	const [ post, setPost ] = useState();
	const { id } = useParams();
	console.log('id from single post', id);
	const renderPost = () => {
		axios
			.get(`/post/${id}`, {
				headers : {
					Authorization :
						'Bearer ' +
						localStorage.getItem('token')
				}
			})
			.then((result) => {
				console.log(
					'render from SinglePost',
					result.data
				);
				setPost(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// renderPost(id)
	//    console.log('wtf is happening?', post)

	useEffect(() => {
		renderPost();
	}, []);

	return (
      <div className="centered-container">
      {
         post ? <Post {...post} renderPost={renderPost} /> : <p>loading post...</p>
      }
      </div>
		
	);
};

export default SinglePost;
