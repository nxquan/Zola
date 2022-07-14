import LoadingSpinner from '@/components/LoadingSpinner';
import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const id = setTimeout(() => {
			setIsLoading(!isLoading);
		}, 1000);

		return () => {
			clearTimeout(id);
		};
	}, []);
	return (
		<div className={cx('wrapper')}>
			{isLoading && <LoadingSpinner title="Đang đăng nhập..." />}
		</div>
	);
}

export default Home;
