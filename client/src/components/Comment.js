import React, {
	useContext,
	useState,
	useEffect
} from 'react';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';

import { UserContext } from '../contexts/UserContext';

const Comment = (props) => {
	const { state } = useContext(UserContext);
	const [ comment, setComment ] = useState('');

	useEffect(() => {
		axios
			.get(`comment/${props.id}`, {
				headers : {
					Authorization :
						'Bearer ' +
						localStorage.getItem('token')
				}
			})
			.then((result) => {
				console.log(result);
				setComment(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const likeControl = (option) => {
		console.log('like');
		axios
			.put(
				`/comment/${props.id}/${option}`,
				{ like: 'like' },
				{
					headers : {
						Authorization :
							'Bearer ' +
							localStorage.getItem('token')
					}
				}
			)
			.then((response) => {
				console.log(response);
				// setPost(response.data.result);
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			{
				comment ? <div className="comment">
					<div className="row top">
						<img
							className="mini-round-avatar"
							src={comment.postedBy.avatar}
							alt="avatar"
						/>
						<p>
							<b className="comm-postedBy">
								{comment.postedBy.name}
							</b>
							{comment.text}
						</p>
						<span className="like-comment">
							{
								comment.likes.includes(
									state._id
								) ? <button
									className="like-btn"
									onClick={() =>
										likeControl('dislike')}
								>
									<i className="material-icons like">
										favorite
									</i>
								</button> :
								<button
									className="like-btn"
									onClick={() =>
										likeControl('like')}
								>
									<i className="material-icons like">
										favorite_border
									</i>
								</button>}
						</span>
					</div>
					<div className="row bottom">
						<ReactTimeAgo
							date={comment.postedOn}
							locale="en-US"
						/>
						<span>
							{
								comment.likes.length ===
								1 ? '1 like' :
								`${comment.likes.length} likes`}
						</span>
						<span>Reply</span>
					</div>
				</div> :
				<p>loading comm</p>}
		</div>
	);
};

export default Comment;
