import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '@/assets/images';
import { useTranslate } from '@/hooks';

const cx = classNames.bind(styles);

function Header() {
	const [t] = useTranslate();

	return (
		<div className={cx('wrapper')}>
			<img className={cx('logo')} src={images.logo} alt="Logo" />
			<p className={cx('description')}>
				{t('DesSignInZalo1')}
				<br />
				{t('DesSignInZalo2')}
			</p>
		</div>
	);
}

export default Header;
