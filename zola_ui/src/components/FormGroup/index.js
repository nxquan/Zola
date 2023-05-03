import React from 'react';
import classNames from 'classnames/bind';
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

export default React.memo(FormGroup);
