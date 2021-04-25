import React, {
	useEffect,
	useContext
} from 'react';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import NewPost from './components/screens/NewPost';
import UserProfile from './components/screens/UserProfile';
import FollowingFeed from './components/screens/FollowingFeed';
import ResetPassword from './components/screens/ResetPassword';
import NewPasswordForm from './components/screens/NewPasswordForm';
import {
	Route,
	Switch,
	useHistory,
	useLocation
} from 'react-router-dom';

import { UserContext } from './contexts/UserContext';
import './App.css';

function App (){
	const history = useHistory();
	const location = useLocation();
	const { state, dispatch } = useContext(
		UserContext
	);
	useEffect(() => {
		const user = localStorage.getItem(
			'loggedUser'
		);
		if (user && user !== 'undefined') {
			// history.push('/');
			dispatch({
				type    : 'USER',
				payload : JSON.parse(user)
			});
		}
		else {
			dispatch({
				type : ''
			});
			if (
				!location.pathname.startsWith('/reset/')
			) {
				history.push('/login');
			}
		}
	}, []);
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/login" exact>
					<Login />
				</Route>
				<Route path="/signup" exact>
					<Signup />
				</Route>
				<Route path="/profile" exact>
					<Profile />
				</Route>
				<Route path="/post/new" exact>
					<NewPost />
				</Route>
				<Route path="/reset-password" exact>
					<ResetPassword />
				</Route>
				<Route path="/posts/following" exact>
					<FollowingFeed />
				</Route>
				<Route path="/reset/:token" exact>
					<NewPasswordForm />
				</Route>
				<Route path="/profile/:id" exact>
					{
						state ? (routeProps) => {
							const {
								id
							} = routeProps.match.params;
							if (id === state._id) {
								return <Profile />;
							}
							else {
								return <UserProfile id={id} />;
							}
						} :
						<Login />}
				</Route>
			</Switch>
		</div>
	);
}

export default App;
