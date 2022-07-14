import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '@/assets/images';

const cx = classNames.bind(styles);

function Header() {
	return (
		<div className={cx('wrapper')}>
			<img className={cx('logo')} src={images.logo} alt="Logo" />
			<p className={cx('description')}>
				Đăng nhập tài khoản Zalo <br /> để kết nối với ứng dụng Zalo Chat
			</p>
		</div>
	);
}

export default Header;
