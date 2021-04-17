import React from 'react';

const Comment = (props) => {
	const { _id, text, name } = props;
	return (
		<p key={_id}>
			<b>{name}</b>
			{text}
		</p>
	);
};

export default Comment;
