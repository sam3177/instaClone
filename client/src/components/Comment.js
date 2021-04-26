import React, {
	useContext,
	useState,
	useEffect
} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';

import { UserContext } from '../contexts/UserContext';

import '../styles/Comment.css'

const Comment = (props) => {
	const { state } = useContext(UserContext);
	const [ comment, setComment ] = useState('');

	useEffect(() => {
		axios
			.get(`/comment/${props.id}`, {
				headers : {
					Authorization :
						'Bearer ' +
						localStorage.getItem('token')
				}
			})
			.then((result) => {
				// console.log(result);
				setComment(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const likeControl = (option) => {
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
				// console.log(response);
				setComment(response.data.result);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			{
				comment ? <div className="comment">
					<div className="row top">
						<Link
							to={`profile/${comment.postedBy
								._id}`}
						>
							<img
								className="mini-round-avatar"
								src={comment.postedBy.avatar}
								alt="avatar"
							/>
						</Link>
						<p>
							<Link
								to={`profile/${comment.postedBy
									._id}`}
							>
								<b className="comm-postedBy">
									{comment.postedBy.name}
								</b>
							</Link>
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
						/>
						<span>
							{
								comment.likes.length ===
								1 ? '1 like' :
								`${comment.likes.length} likes`}
						</span>
						<span>Reply</span>
						<span
							className={

									comment.postedBy._id ===
									state._id ? 'del-com' :
									'hide'
							}
							onClick={() =>
								props.deleteComment(
									comment.postedBy._id,
									comment._id
								)}
						>
							Delete
						</span>
					</div>
				</div> :
				<p>loading comm...</p>}
		</div>
	);
};

export default Comment;
