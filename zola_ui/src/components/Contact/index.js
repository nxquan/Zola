import classNames from 'classnames/bind';

import styles from './Contact.module.scss';
import Image from '@/components/Image';

const cx = classNames.bind(styles);

function Contact({ selected, item, onClick }) {
	let classes = cx('wrapper', { selected });
	return (
		<div className={classes} onClick={onClick}>
			<Image src={item.profilePicture} alt="Avatar" className={cx('avatar')} />
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
