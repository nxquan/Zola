import classNames from 'classnames/bind';
import styles from './Button.module.scss';

import { Link } from 'react-router-dom';

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
	submit,
	...passProps
}) {
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

	let classes = cx(
		'wrapper',
		{ primary },
		{ text },
		{ outline },
		{ rounded },
		{ small },
		{ large },
		{ disabled },
		{ [className]: className }
	);
	return (
		<Component {...props} className={classes}>
			{leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
			<span className={cx('title')}>{children}</span>
			{rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
		</Component>
	);
}

export default Button;
