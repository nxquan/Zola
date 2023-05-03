import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
	href,
	to,
	onClick,
	primary,
	text,
	outline,
	rounded,
	small,
	large,
	disabled,
	leftIcon,
	rightIcon,
	className,
	children,
	...passProps
}) {
	let classes = cx('wrapper', {
		primary,
		text,
		outline,
		rounded,
		small,
		large,
		disabled,
		[className]: className,
	});

	let Component;
	let props = {
		onClick,
		...passProps,
	};

	if (disabled) {
		Object.keys(props).forEach((key, index) => {
			if (key.startsWith('on') && typeof props[key] == 'function') {
				delete props[key];
			}
		});
	}

	if (href) {
		Component = 'a';
		props.href = href;
	} else if (to) {
		Component = Link;
		props.to = to;
	} else {
		Component = 'button';
		props.to = to;
	}

	return (
		<Component
			{...props}
			className={classes}
		>
			{leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
			<span className={cx('title')}>{children}</span>
			{rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
		</Component>
	);
}

Button.propTypes = {
	href: PropTypes.string,
	to: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	primary: PropTypes.string,
	text: PropTypes.string,
	outline: PropTypes.string,
	rounded: PropTypes.string,
	small: PropTypes.string,
	large: PropTypes.string,
	disabled: PropTypes.string,
	leftIcon: PropTypes.node,
	rightIcon: PropTypes.node,
	className: PropTypes.string,
	children: PropTypes.string.isRequired,
	passProp: PropTypes.any,
};

export default React.memo(Button);
