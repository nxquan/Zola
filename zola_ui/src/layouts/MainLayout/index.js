import classNames from 'classnames/bind';

import styles from './MainLayout.module.scss';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
	return (
		<div className={cx('wrapper')}>
			<Sidebar />
			<div className={cx('container')}>
				<div className={cx('content')}>{children}</div>
			</div>
		</div>
	);
}

export default DefaultLayout;
