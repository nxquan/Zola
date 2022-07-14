import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Sidebar from './Sidebar';
import Search from './Search';

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
