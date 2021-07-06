import React, {
	useState,
	useContext
} from 'react';
import {
	useHistory,
	useParams
} from 'react-router-dom';
import M from 'materialize-css';
import axios from 'axios';

import { ThemeContext } from '../../contexts/ThemeContext';

const NewPasswordForm = () => {
	const { isDarkTheme } = useContext(
		ThemeContext
	);
	const history = useHistory();
	const { token } = useParams();
	const [ password, setPassword ] = useState('');
	const [ passwordC, setPasswordC ] = useState(
		''
	);
	const resetPassword = () => {
		if (password === passwordC) {
			axios
				.put(`/reset/${token}`, {
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
							html    : response.data.message,
							classes : 'light-green accent-3'
						});
						history.push('/login');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		else {
			M.toast({
				html    : `passwords don't match!`,
				classes : 'deep-orange darken-3'
			});
		}
	};
	return (
		<div>
			<div
				className={

						isDarkTheme ? 'centered-container dark-cards' :
						'centered-container'
				}
			>
				<div className={isDarkTheme ? 'card formContent dark-cards' : "card formContent"}>
					<h3>Write your new password</h3>
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
									id="passwordC"
									type="password"
									value={passwordC}
									onChange={(e) =>
										setPasswordC(e.target.value)}
								/>
								<label htmlFor="passwordC">
									PasswordConfirmation
								</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s4 offset-s4">
								<button className="btn submit waves-effect waves-light col s12 ">
									Reset Password
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewPasswordForm;
