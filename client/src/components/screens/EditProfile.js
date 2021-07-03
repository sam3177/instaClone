import React, {
	useContext,
	useEffect,
	useState
} from 'react';
import axios from 'axios';
import DatePicker from "react-date-picker";
import { useHistory } from 'react-router-dom';


import { UserContext } from '../../contexts/UserContext';
import { ThemeContext } from '../../contexts/ThemeContext';

import '../../styles/EditProfile.css';

const EditProfile = () => {
	const { state, dispatch } = useContext(
		UserContext
	);
	const {isDarkTheme} = useContext(ThemeContext)

	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ gender, setGender ] = useState('');
	const [ birthday, setBirthday ] = useState(
		Date.now()
	);
	const history = useHistory();

	const submitChanges = () => {
		axios
			.put(
				`/user/${state._id}`,
				{ name, email, gender, birthday },
				{
					headers : {
						Authorization :
							'Bearer ' +
							localStorage.getItem('token')
					}
				}
			)
			.then((res) => {
				localStorage.setItem(
					'loggedUser',
					JSON.stringify(res.data.user)
				);
				dispatch({
					type    : 'USER',
					payload : res.data.user
				});
				history.push('/profile');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(
		() => {
			const {
				name,
				email,
				gender,
				birthday
			} = state;
			setName(name);
			setEmail(email);
			setGender(gender);

				birthday ? setBirthday(
					new Date(birthday)
				) :
				setBirthday(Date.now());
		},
		[ state ]
	);

	return (
		<div>
			{
				!state ? <p>Loading...</p> :
				<div id="all-container"
						className={isDarkTheme && 'dark-background'}
				>
					<div className="row">
						<div className="col s12 avatar-container">
							<img
								className="round-avatar"
								src={state.avatar}
								alt="avatar"
							/>
						</div>
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							submitChanges();
						}}
					>
						<div className="row">
							<div className="col s12 m4">
								<h5>Name</h5>
							</div>
							<div className="col s12 m8">
								<div className="input-field">
									<input
										type="text"
										value={name}
										onChange={(e) =>
											setName(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col s12 m4">
								<h5>Email</h5>
							</div>
							<div className="col s12 m8">
								<div className="input-field">
									<input
										type="text"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)}
									/>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col s12 m4">
								<h5>Gender</h5>
							</div>
							<div className="col s12 m8">
								<div className="input-field select">
									<select
										value={

												gender ? gender :
												'none'
										}
										className="browser-default"
										onChange={(e) =>
											setGender(e.target.value)}
									>
										<option value="none" disabled>
											--
										</option>
										<option value="male">
											Male
										</option>
										<option value="female">
											Female
										</option>
									</select>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col s12 m4">
								<h5>Birthday</h5>
							</div>
							<div className="col s12 m8">
								<div className="input-field">
									<DatePicker 
								// format="y MM dd"
								value={birthday} 
								onChange={date => setBirthday(date)} 
								maxDate={new Date()}
								/>
									
								</div>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s4 offset-s4">
								<button className="btn submit waves-light col s12">
									Submit Changes
								</button>
							</div>
						</div>
					</form>
				</div>}
		</div>
	);
};

export default EditProfile;
