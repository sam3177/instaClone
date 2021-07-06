import React, {
	useContext,
	useEffect
} from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';

import SearchUser from './SearchUser'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';

const NavBar = () => {
	
	const history = useHistory();
	const { state, dispatch } = useContext(
		UserContext
	);
	const { isDarkTheme, toggleTheme } = useContext(
		ThemeContext
	);
	const logout = () => {
		console.log('loggggout');
		localStorage.removeItem('loggedUser');
		localStorage.removeItem('token');
		dispatch({ type: 'CLEAR' });
		history.push('/login');
	};
	const changeTheme = () => {
		localStorage.setItem(
			'isDarkTheme',
			!isDarkTheme
		);
		toggleTheme();
	};

	return (
		<Navbar
			className={isDarkTheme && 'dark-primary'}
			expand="md"
			fixed="top"
		>
			<Navbar.Brand
				className="brand-logo left"
				href={

						state ? '/' :
						'/login'
				}
			>
				Instagram
			</Navbar.Brand>
			<div className="switch-container">
				<input
					type="checkbox"
					id="switch"
					onClick={changeTheme}
				/>
				<label
					id="switch-label"
					htmlFor="switch"
				/>
			</div>
			<SearchUser/>
			<Navbar.Toggle
				className={isDarkTheme && 'white-bg'}
				aria-controls="basic-navbar-nav"
			/>
			<Navbar.Collapse id="basic-navbar-nav">
				{
					state ? <Nav
						className={

								isDarkTheme ? 'mr-auto right dark-primary' :
								'mr-auto right'
						}
					>
						<Nav.Link href="/posts/following">
							Feed
						</Nav.Link>
						<Nav.Link href="/profile">
							{state.name} - MyProfile
						</Nav.Link>
						<Nav.Link href="/post/new">
							Create post
						</Nav.Link>
						<Nav.Item
							// href="/login"
							onClick={logout}
						>
							Logout
						</Nav.Item>
					</Nav> :
					<Nav className="mr-auto right">
						<Nav.Link href="/login">
							Login
						</Nav.Link>
						<Nav.Link href="/signup">
							Signup
						</Nav.Link>
					</Nav>}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
