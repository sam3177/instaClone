import React, {
	useState,
	useEffect
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import '../../styles/EditPost.css'

const EditPost = (props) => {
   const {id} = useParams()
	const [ title, setTitle ] = useState('');
	const [ body, setBody ] = useState('');
   const[photo, setPhoto] = useState('');
	const history = useHistory();
	useEffect(() => {
      axios
			.get(`/post/${id}`, {
				headers : {
					Authorization :
						'Bearer ' +
						localStorage.getItem('token')
				}
			})
			.then((result) => {
				console.log(result);
				setTitle(result.data.title);
				setBody(result.data.body);
            setPhoto(result.data.photo)
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const submitPost = () => {
		axios
			.put(
				`/post/${id}`,
				{title, body },
				{
					headers : {
						Authorization :
							'Bearer ' +
							localStorage.getItem('token')
					}
				}
			)
			.then((res) => {
				console.log(res);
				history.push('/')
			})
			.catch((err) => {
				console.log(err);
			});
         
	};
   
	return (
		<div className="centered-container">
			<div className="card formContent">
				<h3>Edit Post</h3>
				<form
					className="col s12"
					onSubmit={(e) => {
						e.preventDefault();
						submitPost();
					}}
				>
               <div className="row edit">
                  <img src={photo} alt={title}/>
               </div>
					<div className="row">
						<div className="input-field col s12">
							<input
								id="title"
								type="text"
								value={title}
								onChange={(e) =>
									setTitle(e.target.value)}
							/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								id="body"
								type="text"
								value={body}
								onChange={(e) =>
									setBody(e.target.value)}
							/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s4 offset-s4">
							<button className="btn submit waves-effect waves-light col s12">
								Edit Post
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditPost;
