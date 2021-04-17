import axios from 'axios';
import React, {
	useState,
	useEffect
} from 'react';
import {
	Link,
	useHistory
} from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [
		passwordConfirmation,
		setPasswordConfirmation
	] = useState('');
	const [ image, setImage ] = useState('');
	const [ imgUrl, setImgUrl ] = useState(
		'https://www.blogsaays.com/wp-content/uploads/2014/02/no-user-profile-picture-whatsapp.jpg'
	);
	const history = useHistory();
	useEffect(
		() => {
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
		},
		[ image ]
	);
	const registerUser = () => {
		if (password === passwordConfirmation) {
			axios
				.post('/signup', {
					name,
					email,
					password,
					imgUrl
				})
				.then((response) => {
					if (response.data.error) {
						M.toast({
							html    : response.data.error,
							classes : 'deep-orange darken-3'
						});
					}
					else {
						M.toast({
							html    : response.data,
							classes : 'light-green accent-3'
						});
						history.push('/login');
					}
					console.log(response);
				});
		}
	};
	return (
		<div className="centered-container">
			<div className="card formContent">
				<h3>Signup</h3>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						registerUser();
					}}
					className="col s12"
				>
					<div className="row">
						<div className="input-field col s12">
							<input
								id="name"
								type="text"
								value={name}
								onChange={(e) =>
									setName(e.target.value)}
							/>
							<label htmlFor="name">Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) =>
									setEmail(e.target.value)}
							/>
							<label htmlFor="email">Email</label>
						</div>
					</div>
					<div className="row">
						<div className="file-field input-field col s12">
							<div className="btn submit btn-small">
								<span>
									Upload Profile Picture
								</span>
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
						<div className="input-field col s12">
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) =>
									setPassword(e.target.value)}
							/>
							<label htmlFor="password">
								Password
							</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								id="passwordConfirmation"
								type="password"
								value={passwordConfirmation}
								onChange={(e) =>
									setPasswordConfirmation(
										e.target.value
									)}
							/>
							<label htmlFor="passwordConfirmation">
								Confirm Password
							</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s4 offset-s4">
							<button className="btn submit waves-effect waves-light col s12">
								Create Account
							</button>
						</div>
					</div>
				</form>
				<div className="row">
					<div className="input-field">
						<p>
							Have already an account? Please
							<Link to="/login"> login</Link>!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
