import React, {
	useState,
	useContext
} from 'react';
import {
	Link,
	useHistory
} from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';

import { UserContext } from '../../contexts/UserContext';

const Login = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { dispatch } = useContext(UserContext);
	const history = useHistory();
	const loginUser = () => {
		axios
			.post('/login', {
				email,
				password
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
						html    : 'success login',
						classes : 'light-green accent-3'
					});
					const { token, user } = response.data;
					localStorage.setItem('token', token);
					localStorage.setItem(
						'loggedUser',
						JSON.stringify(user)
					);
					dispatch({
						type    : 'USER',
						payload : user
					});
					history.push('/');
				}
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="centered-container">
			<div className="card formContent">
				<h3>Login</h3>
				<form
					className="col s12"
					onSubmit={(e) => {
						e.preventDefault();
						loginUser();
					}}
				>
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
							<label>
								Forgot your password?
								<Link to="/reset-password">
									{' '}
									Click here!
								</Link>
							</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s4 offset-s4">
							<button className="btn submit waves-effect waves-light col s12 ">
								Login
							</button>
						</div>
					</div>
				</form>
				<div className="row">
					<div className="input-field">
						<p>
							Need an account? Please
							<Link to="/signup"> signup</Link>!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
