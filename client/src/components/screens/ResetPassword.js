import React, { useState } from 'react';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom'
import M from 'materialize-css';


const ResetPassword = () => {
	const history = useHistory();
	const [ email, setEmail ] = useState('');
	const resetPassword = () => {
		console.log(email);
		axios.post('/reset-password',{
			email
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
					html    : response.data.message,
					classes : 'light-green accent-3'
				});
				// history.push('/login');
			}
			console.log(response);
		});
	};
	return (
		<div className="centered-container">
			<div className="card formContent">
				<h3>Reset password</h3>
				<form
					className="col s12"
					onSubmit={(e) => {
						e.preventDefault();
						resetPassword();
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
						<div className="input-field col s4 offset-s4">
							<button className="btn submit waves-effect waves-light col s12 ">
								Send Email
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
