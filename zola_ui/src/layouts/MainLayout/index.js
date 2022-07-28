import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Sidebar from './Sidebar';
import Welcome from '@/components/Welcome';
import { getFriendsRoute, getInformationUser, host } from '@/utils/APIRoute';
import Chat from '@/components/Chat';
import { io } from 'socket.io-client';
const cx = classNames.bind(styles);

function MainLayout({ children }) {
	const socketRef = useRef();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);

	const handleChangeChat = (contact) => {
		setCurrentChat(contact);
	};

	const navigate = useNavigate();

	useEffect(() => {
		async function getUserFromLocalStorage() {
			if (!localStorage.getItem('user')) navigate('/login');
			else {
				let temp = await JSON.parse(localStorage.getItem('user'));
				const { data } = await axios.get(getInformationUser, {
					params: {
						phone: temp.phone,
					},
				});
				setCurrentUser(data.infor);
			}
		}
		getUserFromLocalStorage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		async function getAllFriends() {
			const { data } = await axios.get(getFriendsRoute, {
				params: {
					phone: currentUser.phone,
				},
			});
			if (data.status) {
				setContacts((prev) => data.friends);
			} else {
				console.log('No Friends');
			}
		}
		if (!!currentUser) {
			getAllFriends();
		}
	}, [currentUser]);

	useEffect(() => {
		if (currentUser) {
			socketRef.current = io(host);
			socketRef.current.emit('add-user', currentUser._id);
		}
	}, [currentUser]);

	return (
		<div className={cx('wrapper')}>
			<Sidebar
				contacts={contacts}
				currentUser={!!currentUser && currentUser}
				onChangeChat={handleChangeChat}
				hideSidebar={!!currentChat}
			/>
			<div className={cx('container', { 'show-container': !!currentChat })}>
				<div className={cx('content')}>
					{currentChat === undefined ? (
						<Welcome className={'hide-welcome'} />
					) : (
						<Chat
							handleChangeChat={handleChangeChat}
							currentUser={currentUser}
							currentChat={currentChat}
							socket={socketRef}
						></Chat>
					)}
				</div>
			</div>
		</div>
	);
}

export default MainLayout;
