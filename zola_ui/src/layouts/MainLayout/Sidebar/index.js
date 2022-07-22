import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Menu from '@/components/Popper/Menu';

const cx = classNames.bind(styles);

const settingMenu = [
	{
		icon: <FontAwesomeIcon icon={faUser} />,
		title: 'Thông tin tài khoản',
	},
	{
		icon: <FontAwesomeIcon icon={faGear} />,
		title: 'Cài đặt',
	},
	{
		icon: <FontAwesomeIcon icon={faFloppyDisk} />,
		title: 'Lưu trữ',
		separate: true,
		children: [
			{
				title: 'Quản lý file',
			},
		],
	},
	{
		icon: <FontAwesomeIcon icon={faGlobe} />,
		title: 'Ngôn ngữ',
		children: [
			{
				title: 'Tiếng Việt',
				type: 'language',
			},
			{
				title: 'English',
				type: 'language',
			},
		],
	},
	{
		icon: <FontAwesomeIcon icon={faCircleInfo} />,
		title: 'Giới thiệu',
	},
	{
		icon: <FontAwesomeIcon icon={faRightFromBracket} />,
		title: 'Đăng xuất',
		className: 'warning',
		separate: true,
		type: 'LOG_OUT',
	},
];

function Sidebar({ children }) {
	const [tab, setTab] = useState(0);
	const [isShowedMenu, setIsShowedMenu] = useState(false);
	const navigate = useNavigate();
	const handleChangeMenu = (menuItem) => {
		switch (menuItem.type) {
			case 'LOG_OUT':
				async function logOutUser() {
					await localStorage.removeItem('user');
					navigate('/login');
				}
				logOutUser();
				break;
			default:
		}
	};

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
					<NavItem to="/me">
						<FontAwesomeIcon icon={faCloud} />
					</NavItem>
					<NavItem active={tab === 5} onClick={() => setTab(5)}>
						<FontAwesomeIcon icon={faBriefcase} />
					</NavItem>
					<Tippy
						visible={isShowedMenu}
						offset={[70, 0]}
						interactive
						placement="top"
						render={(attrs) => (
							<div className="content" tabIndex="-1" {...attrs}>
								<WrapPopper>
									<Menu items={settingMenu} onChange={handleChangeMenu} />
								</WrapPopper>
							</div>
						)}
						onClickOutside={() => setIsShowedMenu(false)}
					>
						<NavItem
							active={tab === 6}
							onClick={() => {
								setIsShowedMenu(true);
								setTab(6);
							}}
						>
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
