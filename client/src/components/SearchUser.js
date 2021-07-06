import React, {
	useState,
	useContext,
	useEffect,
	useRef
} from 'react';
import M from 'materialize-css';
import axios from 'axios';
import {Link} from 'react-router-dom'

import debounce from '../helpers/debounce';

import { ThemeContext } from '../contexts/ThemeContext';

const SearchUser = () => {
	const [ users, setUsers ] = useState([]);
	const [
		searchUser,
		setSearchUser
	] = useState('');
	const { isDarkTheme } = useContext(
		ThemeContext
	);
	const modal1 = useRef(null);
	useEffect(() => {
		M.Modal.init(modal1.current);
	}, []);
   useEffect(() => {
      fetchUsers()
   },[searchUser])
	
	const fetchUsers = () => {
      
		searchUser !== '' && axios
			.post(
				'/search-user',
				{
					searchUser
				},
				{
					headers : {
						Authorization :
							'Bearer ' +
							localStorage.getItem('token')
					}
				}
			)
			.then((response) => {
				setUsers(response.data.result);
			})
			.catch((err) => {
				console.log(err);
			});
	}
   const onClickUser = () => {
      setUsers([])
      setSearchUser('')

   }
	return (
		<div className="search">
			<i
				className="material-icons modal-trigger"
				data-target="modal1"
			>
				search user
			</i>
			<div
				id="modal1"
				ref={modal1}
				className={

						isDarkTheme ? 'modal dark-background' :
						'modal'
				}
			>
				<div className="modal-content">
					<input
						id="search"
						type="search"
						autoComplete="off"
						placeholder="search user"
						value={searchUser}
						onChange={(e) => {
							setSearchUser(e.target.value);
						}}
					/>
					<ul className="search-results">
                  {users.map((user) =>(
                     <li className="search-item" key={user._id}>
                        <Link 
                        className='modal-close'
                           to={`/profile/${user._id}`}
                           onClick={() => onClickUser()}
                        >
                           {user.name}
                        </Link>
                     </li>
                  ))}
						
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SearchUser;
