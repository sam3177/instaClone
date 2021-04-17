import React from 'react';

const Gallery = (props) => {
	return (
		<div className="gallery">
			{props.data.map((item) => (
				<img
					className="gallery-photo"
					src={item.photo}
					alt={item.title}
					key={item._id}
				/>
			))}
		</div>
	);
};

export default Gallery;
