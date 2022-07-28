import classNames from 'classnames/bind';

import images from '@/assets/images';
import styles from './LoadingSpinner.module.scss';

const cx = classNames.bind(styles);

function LoadingSpinner({ title, icon, children }) {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('logo-wrapper')}>
				<img alt="Logo Zalo" className={cx('logo')} src={images.logo} />
			</div>
			<div className={cx('spinner')}></div>
			<div className={cx('content')}>
				<span>{title}</span>
			</div>
		</div>
	);
}

export default LoadingSpinner;
