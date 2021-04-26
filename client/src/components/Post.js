import React, {
	useState,
	useContext
} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';

import { UserContext } from '../contexts/UserContext';
import useToggle from '../helpers/SwitchHelper';
import Comment from './Comment';

import '../styles/Post.css'

const Post = (props) => {
	const { state } = useContext(UserContext);
	const [ comment, setComment ] = useState('');

	const [
		optionsShow,
		toggleOptionsShow
	] = useToggle(false);
	const [ post, setPost ] = useState(props);
	const {
		photo,
		likes,
		_id,
		comments,
		title,
		body,
		postedBy,
		postedOn
	} = post;
	const { name, avatar } = post.postedBy;

	// console.log(props.postedBy);
	const likeControl = (option) => {
		console.log('like');
		axios
			.put(
				`/post/${_id}/${option}`,
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
				setPost(response.data.result);
			})
			.catch((err) => console.log(err));
	};
	const addComment = () => {
		axios
			.put(
				`/post/${_id}/add-comment`,
				{ text: comment },
				{
					headers : {
						Authorization :
							'Bearer ' +
							localStorage.getItem('token')
					}
				}
			)
			.then((response) => {
				setPost(response.data.result);
			})
			.catch((err) => console.log(err));
	};
	const deleteComment = (postedBy, id) => {
		if (
			postedBy === state._id ||
			postedBy._id === state._id
		) {
			axios
				.delete(
					`/post/${_id}/comment/${id}/delete`,
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
					setPost(response.data.result);
				})
				.catch((err) => console.log(err));
		}
		else {
			console.log(
				"Not your comment or not your post, you can't delete it! "
			);
		}
	};
	const deletePost = () => {
		if (postedBy._id === state._id) {
			axios
				.delete(`/post/${_id}/delete`, {
					headers : {
						Authorization :
							'Bearer ' +
							localStorage.getItem('token')
					}
				})
				.then((response) => {
					// console.log(response);
					props.renderPosts();
				})
				.catch((err) => console.log(err));
		}
		else {
			console.log(
				"Not your post, you can't delete it! "
			);
		}
	};

	return (
		<div>
			<div className="post card">
				<div className="card-content">
					<div className="post-header">
						<div className="user-info">
							<Link
								to={`/profile/${postedBy._id}`}
							>
								<img
									className="mini-round-avatar"
									src={avatar}
									alt="avatar"
								/>
							</Link>
							<Link
								to={`/profile/${postedBy._id}`}
							>
								{name}
							</Link>
						</div>
						<span
							onClick={toggleOptionsShow}
							className="float-right"
						>
							<i className="material-icons">
								more_horiz
							</i>
							<div
								className={

										optionsShow ? 'card post-options' :
										'hide'
								}
							>
								<ul className="">
									<li>Share</li>
									<li>Edit</li>
									<li
										className={

												postedBy._id ===
												state._id ? '' :
												'disabled'
										}
										onClick={deletePost}
									>
										Delete
									</li>
									<li>Report</li>
								</ul>
							</div>
						</span>
					</div>
					<div className="row bottom">
						<ReactTimeAgo date={postedOn} />
					</div>
					<div className="card-image">
						<img
							className="post-photo"
							src={photo}
							alt="post"
						/>
					</div>
					<div className="post-sections">
						{
							post.likes.includes(
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
						<button className="like-btn">
							<i className="material-icons comm">
								mode_comment
							</i>
						</button>
					</div>
					<div className="post-sections">
						<span>
							{
								likes.length === 1 ? '1 like' :
								`${likes.length} likes`}
						</span>
						<span>
							{
								comments.length ===
								1 ? '1 comment' :
								`${comments.length} comments`}
						</span>
					</div>
					<div className="post-sections">
						<h3>{title}</h3>
						<p>{body}</p>
					</div>
					<div
						className={

								comments.length ===
								0 ? 'comments hide' :
								'comments'
						}
					>
						{comments.map((comment) => (
							<Comment
								key={comment}
								id={comment}
								deleteComment={deleteComment}
							/>
						))}
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							addComment();
							setComment('');
						}}
					>
						<input
							type="text"
							value={comment}
							name="comment"
							placeholder="add a comment..."
							onChange={(e) =>
								setComment(e.target.value)}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Post;
