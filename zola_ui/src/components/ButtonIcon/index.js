import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ButtonIcon.module.scss';

const cx = classNames.bind(styles);

const ButtonIcon = forwardRef(
	({ to, onClick, active, disabled, children, className, type }, ref) => {
		let Component = 'button';
		let props = {
			onClick,
			type,
		};
		if (to) {
			Component = Link;
			props.to = to;
		}
		let classes = cx('wrapper', { [className]: className }, { active }, { disabled });
		return (
			<Component className={classes} ref={ref} {...props}>
				{children}
			</Component>
		);
	}
);

export default ButtonIcon;
