import React from 'react';
import {Link} from 'react-router-dom'

import '../../src/styles/Gallery.css'

const Gallery = (props) => {
	return (
		<div className="gallery">
			{props.data.map((item) => (
				<Link 
					to={`/post/${item._id}`}
					key={item._id}
				>
				<img
					className="gallery-photo"
					src={item.photo}
					alt={item.title}
					
				/>
				</Link>
			))}
		</div>
	);
};

export default Gallery;
