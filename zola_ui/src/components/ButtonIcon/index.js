import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ButtonIcon.module.scss';

const cx = classNames.bind(styles);

const ButtonIcon = forwardRef(({ to, onClick, active, children, className }, ref) => {
	let Component = 'button';
	let props = {
		onClick,
	};
	if (to) {
		Component = Link;
		props.to = to;
	}
	let classes = cx('wrapper', { [className]: className }, { active });
	return (
		<Component className={classes} ref={ref} onClick={onClick}>
			{children}
		</Component>
	);
});

export default ButtonIcon;
