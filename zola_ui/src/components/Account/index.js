import { IoCloseOutline } from 'react-icons/io5';

import classNames from 'classnames/bind';
import styles from './Account.module.scss';

import Image from '@/components/Image';
const cx = classNames.bind(styles);

function Account({ item, onClick }) {
	const props = {
		onClick,
	};
	return (
		<div className={cx('wrapper')} {...props}>
			<Image src={item.profilePicture} className={cx('avatar')} />
			<div className={cx('inner')}>
				<h5 className={cx('username')}>{item.username}</h5>
				<button className={cx('delete')}>
					<IoCloseOutline />
				</button>
			</div>
		</div>
	);
}

export default Account;
