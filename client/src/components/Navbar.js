import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import { UserContext } from '../contexts/UserContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css'

const NavBar = () => {
	const { state, dispatch } = useContext(
		UserContext
	);
	const logout = () => {
		console.log('loggggout');
		localStorage.removeItem('loggedUser');
		localStorage.removeItem('token');
		dispatch({ type: 'CLEAR' });
	};
	return (
		<Navbar bg="light" expand="md">
			<Navbar.Brand
				className="brand-logo left"
				href={

						state ? '/' :
						'/login'
				}
			>
				Instagram
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				{
					state ? <Nav className="mr-auto right">
						<Nav.Link href="/posts/following">
							Feed
						</Nav.Link>
						<Nav.Link href="/profile">
							{state.name} - MyProfile
						</Nav.Link>
						<Nav.Link href="/post/new">
							Create post
						</Nav.Link>
						<Nav.Link
							href="/login"
							onClick={logout}
						>
							Logout
						</Nav.Link>
					</Nav> :
					<Nav className="mr-auto right">
						<Nav.Link href="/login">
							Login
						</Nav.Link>
						<Nav.Link href="/signup">
							Signup
						</Nav.Link>
					</Nav>}
				{/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
