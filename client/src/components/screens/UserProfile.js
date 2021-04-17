import React, {
	useEffect,
	useState,
	useContext
} from 'react';
import axios from 'axios';
import Gallery from '../Gallery';
import { UserContext } from '../../contexts/UserContext';

const Profile = (props) => {
	const { state , dispatch} = useContext(UserContext);
	const [ user, setUser ] = useState();
	const [ posts, setPosts ] = useState([]);
	useEffect(() => {
		axios
			.get(
				`/user/${props.id}`,
				{
					headers : {
						Authorization :
							'Bearer ' +
							localStorage.getItem('token')
					}
				}
			)
			.then((res) => {
				setUser(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get(
				`/posts/${props.id}`,
				{
					headers : {
						Authorization :
							'Bearer ' +
							localStorage.getItem('token')
					}
				}
			)
			.then((res) => {
				setPosts(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const followControl = (choice) => {
		axios
			.put(
				`/user/${user._id}/${choice}`,
				{ id: props.id },
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
               JSON.stringify(res.data.me)
               );
               setUser(res.data.result);
					dispatch({
						type    : 'USER',
						payload : res.data.me
					});
					console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
      <>
      {!user ? <p>Loading...</p> : 
      <div id="all-container">
      
			<div className="row general-infos">
				<div className="col s12 m4">
					<img
						className="round-avatar"
						src={user.avatar}
						alt="avatar"
					/>
				</div>
				<div className="col s12 m8">
					<div className="row profile-container">
						<div className="col s12">
							<h4>{user.name}</h4>
							<p>{user.email}</p>
						</div>
						<div className="col s4">
							{
								user.followers.includes(
									state._id
								) ? <button
									className="submit btn"
									onClick={() =>
										followControl('unfollow')}
								>
									UnFollow
								</button> :
								<button
									className="submit btn"
									onClick={()=>followControl(
										'follow'
									)}
								>
									Follow
								</button>}
						</div>
					</div>
					<div className="row profile-container">
						<div className="col s4">
							<p>
								{
									posts.length === 1 ? `1 post` :
									`${posts.length} posts`}
							</p>
						</div>
						<div className="col s4">
							<p>
								{
									user.followers.length ===
									1 ? `1 follower` :
									`${user.followers
										.length} followers`}
							</p>
						</div>
						<div className="col s4">
							<p>{`${user.following
								.length} following`}</p>
						</div>
					</div>
				</div>
			</div>
			<Gallery data={posts} />
         </div>
      }
      </>
	);
};

export default Profile;
