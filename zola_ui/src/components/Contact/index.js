import classNames from 'classnames/bind';

import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

function Contact({ selected, item }) {
	let classes = cx('wrapper', { selected });
	return (
		<div className={classes}>
			<img
				src={
					item.profilePicture ||
					'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
				}
				alt="Avatar"
				className={cx('avatar')}
			/>
			<div className={cx('infor')}>
				<h3 className={cx('name')}>{item.username}</h3>
				<p className={cx('message')}>
					<span>Bạn: </span>
					nhớ uống thuốc đó
				</p>
			</div>
		</div>
	);
}

export default Contact;
