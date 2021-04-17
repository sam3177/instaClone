import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {UserContext } from '../contexts/UserContext';

const NavBar = () => {
	const { state , dispatch} = useContext(UserContext);
	const logout = () => {
		console.log('loggggout')
		localStorage.removeItem('loggedUser')
		localStorage.removeItem('token')
		dispatch({type:"CLEAR"})
	};
	return (
		<nav>
			<div className="nav-wrapper">
				<Link to={state?"/": '/login'} className="brand-logo left">
					Instagram
				</Link>

				{
					state ? <ul
						id="nav-mobile"
						className="right"
					>
						<li>
							<Link to="/posts/following">
								Feed
							</Link>
						</li>
						<li>
							<Link to="/profile">
								{state.name} - MyProfile
							</Link>
						</li>
						<li>
							<Link to="/post/new">
								Create post
							</Link>
						</li>
						<li>
							<Link to="/login" onClick={logout}>
								Logout
							</Link>
						</li>
					</ul> :
					<ul id="nav-mobile" className="right">
						<li>
							<Link to="/login">LogIn</Link>
						</li>
						<li>
							<Link to="/signup">Signup</Link>
						</li>
					</ul>}
			</div>
		</nav>
	);
};

export default NavBar;
