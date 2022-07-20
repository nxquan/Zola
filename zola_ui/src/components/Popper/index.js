import classNames from 'classnames/bind';

import styles from './Popper.module.scss';

function Popper({ children }) {
	return <div className={cx('wrapper')}>{children}</div>;
}

export default Popper;
