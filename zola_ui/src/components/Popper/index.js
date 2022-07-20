import classNames from 'classnames/bind';

import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Popper({ children, className }) {
	let classes = cx('wrapper', { [className]: className });
	return <div className={classes}>{children}</div>;
}

export default Popper;
