import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import { forwardRef } from 'react';
import { useTranslate } from '@/hooks';

const cx = classNames.bind(styles);

const MenuItem = forwardRef(({ item, className, onClick }, ref) => {
	let classes = cx('menu-item', { [className]: className }, { heading: item.heading });
	const [t] = useTranslate();
	return (
		<>
			{item.separate && <div className={cx('separate')}></div>}
			<button className={classes} ref={ref} onClick={onClick}>
				{item.icon && <span className={cx('icon')}>{item.icon}</span>}
				<span className={cx('title')}>{t(item.title)}</span>
				{item.children && (
					<span className={cx('icon', 'right-icon')}>
						{<FontAwesomeIcon icon={faChevronRight} />}
					</span>
				)}
			</button>
		</>
	);
});

export default MenuItem;
