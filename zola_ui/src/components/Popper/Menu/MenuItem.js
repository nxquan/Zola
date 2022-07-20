import classNames from 'classnames/bind';
import Button from '@/components/Button';

import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function MenuItem({ icon, title, separate, className }) {
	let classes = cx('menu-item', { separate }, { [className]: className });
	return (
		<Button className={classes} leftIcon={icon}>
			{title}
		</Button>
	);
}

export default MenuItem;
