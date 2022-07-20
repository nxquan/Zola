import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCommentDots,
	faAddressBook,
	faSquareCheck,
	faCloud,
	faBriefcase,
	faGear,
	faClockFour,
	faUser,
	faFloppyDisk,
	faGlobe,
	faCircleInfo,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Search from '../Search';
import NavItem from '@/components/NavItem';
import images from '@/assets/images';
import WrapPopper from '@/components/Popper';
import MenuItem from '@/components/Popper/Menu/MenuItem';

const cx = classNames.bind(styles);

let settingMenu = [
	{
		icon: <FontAwesomeIcon icon={faUser} />,
		title: 'Thông tin tài khoản',
	},
	{
		icon: <FontAwesomeIcon icon={faGear} />,
		title: 'Cài đặt',
		separate: true,
	},
	{
		icon: <FontAwesomeIcon icon={faFloppyDisk} />,
		title: 'Lưu trữ',
	},
	{
		icon: <FontAwesomeIcon icon={faGlobe} />,
		title: 'Ngôn ngữ',
	},
	{
		icon: <FontAwesomeIcon icon={faCircleInfo} />,
		title: 'Giới thiệu',
	},
	{
		icon: <FontAwesomeIcon icon={faRightFromBracket} />,
		title: 'Đăng xuất',
		separate: true,
		className: 'warning',
	},
];

function Sidebar({ children }) {
	const [tab, setTab] = useState(0);

	return (
		<div className={cx('wrapper')}>
			<div className={cx('main-bar')}>
				<div>
					<div className={cx('nav-tab-top')}>
						<div className={cx('nav-tab-avt')}>
							<img alt="Avatar" src={images.avt} />
						</div>
						<NavItem active={tab === 0} onClick={() => setTab(0)} to="/message">
							<FontAwesomeIcon icon={faCommentDots} />
						</NavItem>
						<NavItem active={tab === 1} onClick={() => setTab(1)} to="/contact">
							<FontAwesomeIcon icon={faAddressBook} />
						</NavItem>
						<NavItem active={tab === 2} onClick={() => setTab(2)} to="/todo">
							<FontAwesomeIcon icon={faSquareCheck} />
						</NavItem>
						<NavItem active={tab === 3} onClick={() => setTab(3)} to="/diary">
							<FontAwesomeIcon icon={faClockFour} />
						</NavItem>
					</div>
				</div>
				<div className={cx('nav-tab-bottom')}>
					<NavItem active={tab === 4} onClick={() => setTab(4)} to="/me">
						<FontAwesomeIcon icon={faCloud} />
					</NavItem>
					<NavItem active={tab === 5} onClick={() => setTab(5)}>
						<FontAwesomeIcon icon={faBriefcase} />
					</NavItem>
					<Tippy
						offset={[80, 0]}
						interactive
						placement="top"
						render={(attrs) => (
							<div className="content" tabIndex="-1" {...attrs}>
								<WrapPopper>
									{settingMenu.map((item, index) => {
										return (
											<MenuItem
												key={index}
												icon={item.icon}
												title={item.title}
												separate={item.separate}
												className={item.className}
											/>
										);
									})}
								</WrapPopper>
							</div>
						)}
					>
						<NavItem active={tab === 6} onClick={() => setTab(6)}>
							<FontAwesomeIcon icon={faGear} />
						</NavItem>
					</Tippy>
				</div>
			</div>

			<div className={cx('aux-bar')}>
				<Search />
				<div className={cx('container')}>
					<div className={cx('content')}>{children}</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
