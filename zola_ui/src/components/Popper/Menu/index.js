import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import WrapPopper from '@/components/Popper';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ items, className, onChange = defaultFn }) {
	const renderItem = () => {
		return items.map((item, index) => {
			if (item.children) {
				return (
					<Tippy
						key={index}
						offset={[-10, 0]}
						interactive
						placement="right-start"
						render={(attrs) => (
							<div className="content" tabIndex="-1" {...attrs}>
								<WrapPopper>
									<Menu items={item.children} onChange={onChange} />
								</WrapPopper>
							</div>
						)}
						hideOnClick={false}
					>
						<MenuItem key={index} item={item} className={item.className} />
					</Tippy>
				);
			} else {
				return (
					<MenuItem
						onClick={(e) => {
							onChange(item);
						}}
						key={index}
						item={item}
						className={item.className}
					/>
				);
			}
		});
	};

	return <div className={cx('menu-list', { [className]: className })}>{renderItem()}</div>;
}

Menu.propTypes = {
	items: PropTypes.array,
	onChange: PropTypes.func,
};

export default Menu;
