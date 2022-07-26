import LoadingSpinner from '@/components/LoadingSpinner';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(undefined);

	const navigate = useNavigate();

	useEffect(() => {
		const id = setTimeout(() => {
			setIsLoading(!isLoading);
		}, 5000);

		return () => {
			clearTimeout(id);
		};
	}, []);

	useEffect(() => {
		async function getUserFromLocalStorage() {
			if (!localStorage.getItem('user')) navigate('/login');
			else setCurrentUser(await JSON.parse(localStorage.getItem('user')));
		}
		getUserFromLocalStorage();
	}, []);

	return (
		<div className={cx('wrapper')}>
			{isLoading && <LoadingSpinner title="Đang đăng nhập..." />}
		</div>
	);
}

export default Home;
