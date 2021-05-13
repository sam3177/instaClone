import React, {
	useContext,
	useEffect,
	useState
} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import Gallery from '../Gallery';
import { UserContext } from '../../contexts/UserContext';

import '../../styles/Profile.css'

const Profile = () => {
	const { state, dispatch } = useContext(
		UserContext
	);
	const [ posts, setPosts ] = useState([]);
	const [ image, setImage ] = useState('');
	const [ imgUrl, setImgUrl ] = useState('');

	useEffect(() => {
		axios
			.get(`/posts/my-posts`, {
				headers : {
					Authorization :
						'Bearer ' +
						localStorage.getItem('token')
				}
			})
			.then((res) => {
				setPosts(res.data.posts);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(
		() => {
			if (image) {
				console.log('render with image', image);
				const data = new FormData();
				data.append('file', image);
				data.append(
					'upload_preset',
					'instaClone'
				);
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
			}
		},
		[ image ]
	);

	useEffect(
		() => {
			if (imgUrl) {
				// console.log('ready to send request');
				axios
					.put(
						`/user/${state._id}`,
						{ avatar: imgUrl },
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
						setImage(undefined);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},
		[ imgUrl ]
	);
	return (
		<div>
			{
				!state ? <p>Loading...</p> :
				<div id="all-container">
					<div className="row general-infos">
						<div className="col s12 m4 avatar-container">
							<img
								className="round-avatar"
								src={state.avatar}
								alt="avatar"
							/>
							<div className="file-field input-field col s12 upload-avatar">
								<button className="submit">
									<input
										type="file"
										onChange={(e) => {
											setImage(e.target.files[0]);
										}}
									/>
									<span>
										UPLOAD PROFILE PICTURE
									</span>
								</button>
							</div>
						</div>
						<div className="col s12 m8">
							<div className="row profile-container">
								<div className="col s6">
									<h4>{state.name}</h4>
									<p>{state.email}</p>
								</div>
								<div className="col s4">
									<Link to="/edit-profile">

									<button className="submit btn">
										Edit profile
									</button>
									</Link>
								</div>
								<div className="col s2">
									{/* <i className="material-icons">
										settings
									</i> */}
								</div>
							</div>
							<div className="row profile-container">
								<div className="col s4">
									<p>
										{
											posts.length ===
											1 ? `1 post` :
											`${posts.length} posts`}
									</p>
								</div>
								<div className="col s4">
									<p>
										{
											state.followers.length ===
											1 ? `1 follower` :
											`${state.followers
												.length} followers`}
									</p>
								</div>
								<div className="col s4">
									<p>{`${state.following
										.length} following`}</p>
								</div>
							</div>
						</div>
					</div>
					<Gallery data={posts} />
				</div>}
		</div>
	);
};

export default Profile;
