import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Sidebar from './Sidebar';
import { getFriendsRoute, getInformationUser } from '@/utils/APIRoute';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
	const [currentUser, setCurrentUser] = useState(undefined);
	const [contacts, setContacts] = useState([]);
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

	return (
		<div className={cx('wrapper')}>
			<Sidebar contacts={contacts} currentUser={currentUser} />
			<div className={cx('container')}>
				<div className={cx('content')}>{children}</div>
			</div>
		</div>
	);
}

export default MainLayout;
