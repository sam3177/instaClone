import React, {
	useState,
	useEffect
} from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import axios from 'axios';

const NewPost = () => {
	const [ title, setTitle ] = useState('');
	const [ body, setBody ] = useState('');
	const [ image, setImage ] = useState('');
	const [ imgUrl, setImgUrl ] = useState('');
	const history = useHistory();

	useEffect(() => {
		imgUrl &&
			axios
				.post(
					'/posts/new',
					{
						title,
						body,
						photo : imgUrl
					},
					{
						headers : {
							Authorization :
								'Bearer ' +
								localStorage.getItem('token')
						}
					}
				)
				.then((response) => {
					if (response.data.error) {
						M.toast({
							html    : response.data.error,
							classes : 'deep-orange darken-3'
						});
					}
					else {
						M.toast({
							html    : 'post added successfully',
							classes : 'light-green accent-3'
						});
						history.push('/');
					}
					// console.log(response);
				})
				.catch((err) => {
					console.log(err);
				});
	});
	const addNewPost = () => {
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'instaClone');
		data.append('cloud_name', 'sam317sam');
		// console.log(data);
		axios
			.post(
				'https://api.cloudinary.com/v1_1/sam317sam/image/upload',
				data
			)
			.then((response) => {
				setImgUrl(response.data.url);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="centered-container">
			<div className="card formContent">
				<h3>New post</h3>
				<form
					className="col s12"
					onSubmit={(e) => {
						e.preventDefault();
						addNewPost();
					}}
				>
					<div className="row">
						<div className="input-field col s12">
							<input
								id="title"
								type="text"
								value={title}
								onChange={(e) =>
									setTitle(e.target.value)}
							/>
							<label htmlFor="title">Title</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								id="body"
								type="text"
								value={body}
								onChange={(e) =>
									setBody(e.target.value)}
							/>
							<label htmlFor="body">Body</label>
						</div>
					</div>
					<div className="row">
						<div className="file-field input-field col s12">
							<div className="btn submit btn-small">
								<span>Upload image</span>
								<input
									type="file"
									onChange={(e) => {
										setImage(e.target.files[0]);
									}}
								/>
							</div>
							<div className="file-path-wrapper">
								<input
									className="file-path validate"
									type="text"
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s4 offset-s4">
							<button className="btn submit waves-effect waves-light col s12">
								Add new post
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewPost;
