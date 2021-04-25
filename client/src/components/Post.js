import React, {
	useState,
	useContext
} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import useToggle from '../helpers/SwitchHelper';

import Comment from './Comment';

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
		postedBy
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
				console.log(response);
				setPost(response.data.result);
			})
			.catch((err) => console.log(err));
	};
	const addComment = (option) => {
		axios
			.put(
				`/post/${_id}/${option}`,
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
				console.log('hahaha');
			})
			.catch((err) => console.log(err));
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
					console.log(response);
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
							<img
								className="mini-round-avatar"
								src={avatar}
								alt="avatar"
							/>
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
						<span>{likes.length} like(s)</span>
						<span>
							{comments.length} comment(s)
						</span>
					</div>
					<div className="post-sections">
						<h3>{title}</h3>
						<p>{body}</p>
					</div>
					<div className="comments">
						{comments.map((comment) => (
							<Comment
								key={comment}
								id={comment}
							/>
						))}
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							addComment('comment_add');
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
