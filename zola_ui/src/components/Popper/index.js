import classNames from 'classnames/bind';

import styles from './Popper.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Popper({ children, className }) {
	let classes = cx('wrapper', { [className]: className });
	return <div className={classes}>{children}</div>;
}

Popper.propTypes = {
	children: PropTypes.element,
};

export default Popper;
