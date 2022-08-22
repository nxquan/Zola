import { IoCloseOutline } from 'react-icons/io5';

import classNames from 'classnames/bind';
import styles from './Account.module.scss';

import Image from '@/components/Image';
const cx = classNames.bind(styles);

function Account({ account }) {
	return (
		<div className={cx('wrapper')}>
			<Image className={cx('avatar')} />
			<div className={cx('inner')}>
				<h5 className={cx('username')}>Em</h5>
				<button className={cx('delete')}>
					<IoCloseOutline />
				</button>
			</div>
		</div>
	);
}

export default Account;
