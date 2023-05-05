import React from 'react';
import classNames from 'classnames/bind';
import lodash from 'lodash';

import styles from './FormGroup.module.scss';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function FormGroup({ icon, className, type, autoComplete = 'off', value, name, onChange = defaultFn, ...passProps }) {
	const classes = cx('form-group', { [className]: className });
	return (
		<div className={classes}>
			<span className={cx('form-icon')}>{icon}</span>
			<input
				className={cx('form-input')}
				type={type}
				value={value}
				name={name}
				autoComplete={autoComplete}
				onChange={(e) => onChange(e)}
				{...passProps}
			/>
		</div>
	);
}

// Customize HOC React.memo with new condition
export default React.memo(FormGroup, (prevProps, nextProps) => {
	return (
		lodash.isEqual(prevProps.icon.props, nextProps.icon.props) &&
		prevProps.className === nextProps.className &&
		prevProps.type === nextProps.type &&
		prevProps.value === nextProps.value &&
		prevProps.onChange === nextProps.onChange
	);
});
