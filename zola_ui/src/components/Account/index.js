import { IoCloseOutline } from 'react-icons/io5';

import classNames from 'classnames/bind';
import styles from './Account.module.scss';

import Image from '@/components/Image';
import PropTypes from 'prop-types';

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

Account.propTypes = {
	item: PropTypes.object,
	onClick: PropTypes.func,
};

export default Account;
