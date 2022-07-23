import classNames from 'classnames/bind';

import styles from './Account.module.scss';

const cx = classNames.bind(styles);

function Account({ selected }) {
	let classes = cx('wrapper', { selected });
	return (
		<div className={classes}>
			<img
				src="https://s120-ava-talk.zadn.vn/f/2/1/e/28/120/dd674c447e039183ff90675b34b36ad4.jpg"
				alt="Avatar"
				className={cx('avatar')}
			/>
			<div className={cx('infor')}>
				<h3 className={cx('name')}>My Darling</h3>
				<p className={cx('message')}>
					<span>Bạn: </span>
					nhớ uống thuốc đó
				</p>
			</div>
		</div>
	);
}

export default Account;
