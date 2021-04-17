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
	const [ comms, setComms ] = useState([
		props.comms
	]);
	const [
		commentsShow,
		toggleCommentsShow
	] = useToggle(false);
	const [
		optionsShow,
		toggleOptionsShow
	] = useToggle(false);
	const [
		{ title, body, photo, _id, likes, comments },
		setPost
	] = useState(props.data);

	// console.log(props.postedBy);
	const { name, avatar } = props.postedBy;
	const postedById = props.postedBy._id;
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

				setComms(
					response.data.result.comments.map(
						(c) => (
							<Comment
								key={c._id}
								_id={c._id}
								text={c.text}
								name={c.postedBy.name}
							/>
						)
					)
				);
			})
			.catch((err) => console.log(err));
	};
	const deletePost = () => {
		if (postedById === state._id) {
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
		<div className="post card">
			<div className="card-content">
				<div className="post-header">
					<div className="user-info">
						<img
							className="mini-round-avatar"
							src={avatar}
							alt="avatar"
						/>
						<Link to={`/profile/${postedById}`}>
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

											postedById ===
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
						likes.includes(state._id) ? <button
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
							onClick={() => likeControl('like')}
						>
							<i className="material-icons like">
								favorite_border
							</i>
						</button>}
					<button
						className="like-btn"
						onClick={toggleCommentsShow}
					>
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
				<h3>{title}</h3>
				<p>{body}</p>
				<div
					className={

							commentsShow ? 'comments' :
							'comments hide'
					}
				>
					{comms}
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
	);
};

export default Post;
