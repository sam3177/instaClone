import React, {useContext}from 'react';

import { UserContext } from '../contexts/UserContext';


const Comment = (props) => {
	const { state } = useContext(UserContext);

	const { _id, text, name, avatar, likes } = props;
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
	return (
		<div className="comment">
			<div className="">
				<img
					className="mini-round-avatar"
					src={avatar}
					alt="avatar"
				/>
			</div>
			<div className="">
				<p key={_id}>
					<b className="comm-postedBy">{name}</b>
					{text}
				</p>
			</div>
			<span className="like-comment">
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
			</span>
		</div>
	);
};

export default Comment;
