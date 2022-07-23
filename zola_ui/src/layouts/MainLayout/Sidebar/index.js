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
	faChevronDown,
	faCaretDown,
	faCaretRight,
	faCheck,
} from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import Search from '../Search';
import NavItem from '@/components/NavItem';
import images from '@/assets/images';
import WrapPopper from '@/components/Popper';
import Menu from '@/components/Popper/Menu';
import Account from '@/components/Account';
import Button from '@/components/Button';

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
				icon: <FontAwesomeIcon className={cx('language-icon', 'show')} icon={faCheck} />,
				type: 'language',
			},
			{
				title: 'English',
				icon: <FontAwesomeIcon className={cx('language-icon')} icon={faCheck} />,
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

const typeMessage = [
	{
		title: 'Hiển thị tất cả tin nhắn',
		icon: <FontAwesomeIcon className={cx('message-icon', 'show')} icon={faCheck} />,
	},
	{
		title: 'Chỉ tin nhắn chưa đọc',
		icon: <FontAwesomeIcon className={cx('message-icon')} icon={faCheck} />,
	},
	{
		title: 'Chỉ tin nhắn từ người lạ',
		icon: <FontAwesomeIcon className={cx('message-icon')} icon={faCheck} />,
	},
];

const typeActionMenu = [
	{
		title: 'Đánh dấu tin đã đã đọc',
	},
	{
		title: 'Gửi tin đồng thời',
	},
	{
		title: 'Chuyển sang giao diện mới',
		separate: true,
	},
];

function Sidebar({ children }) {
	const [tab, setTab] = useState(0);
	const [isShowedMenu, setIsShowedMenu] = useState(false);
	const [isShowedTypeMessageMenu, setIsShowedTypeMessageMenu] = useState(false);
	const [isShowedTypeActionMenu, setIsShowedTypeActionMenu] = useState(false);
	const [showCategory, setShowCategory] = useState(false);

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
						appendTo={() => document.body}
						visible={isShowedMenu}
						offset={[70, 0]}
						interactive
						placement="top"
						render={(attrs) => (
							<div className="content" tabIndex="-1" {...attrs}>
								<WrapPopper>
									<Menu
										items={settingMenu}
										className={cx('menu-list--width')}
										onChange={handleChangeMenu}
									/>
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
					<div className={cx('content')}>
						<div className={cx('category')}>
							<Button
								className={cx('category-btn--open')}
								text
								leftIcon={
									showCategory ? (
										<FontAwesomeIcon icon={faCaretDown} />
									) : (
										<FontAwesomeIcon icon={faCaretRight} />
									)
								}
								onClick={() => setShowCategory(!showCategory)}
							>
								Phân loại
							</Button>
							<div className={cx('category-list', { active: showCategory })}>
								<div className={cx('category-item', 'active')}>
									<div className={cx('category-count')}>1</div>
									<Button rounded className={cx('category-btn')}>
										Tất cả
									</Button>
								</div>
								<div className={cx('category-item')}>
									<Button rounded className={cx('category-btn')}>
										ƯU TIÊN
									</Button>
								</div>
								<div className={cx('category-item')}>
									<Button rounded className={cx('category-btn')}>
										KHÁC
									</Button>
								</div>
							</div>
						</div>
						<div className={cx('actions')}>
							<Tippy
								appendTo={() => document.body}
								visible={isShowedTypeMessageMenu}
								interactive
								offset={[0, 1]}
								placement="bottom-start"
								render={(attrs) => (
									<div className="content" tabIndex="-1" {...attrs}>
										<WrapPopper>
											<Menu items={typeMessage} />
										</WrapPopper>
									</div>
								)}
								onClickOutside={() => setIsShowedTypeMessageMenu(false)}
							>
								<button
									className={cx('action-btn')}
									onClick={() => setIsShowedTypeMessageMenu(true)}
								>
									Tất cả tin nhắn
									<FontAwesomeIcon icon={faChevronDown} />
								</button>
							</Tippy>
							<Tippy
								appendTo={() => document.body}
								visible={isShowedTypeActionMenu}
								interactive
								offset={[0, 1]}
								placement="bottom-start"
								render={(attrs) => (
									<div className="content" tabIndex="-1" {...attrs}>
										<WrapPopper>
											<Menu items={typeActionMenu} />
										</WrapPopper>
									</div>
								)}
								onClickOutside={() => setIsShowedTypeActionMenu(false)}
							>
								<button
									className={cx('action-btn', 'action-btn--primary')}
									onClick={() => setIsShowedTypeActionMenu(true)}
								>
									Thao tác
								</button>
							</Tippy>
						</div>
						<div className={cx('inner')}>
							<Account selected />
							<Account />
							<Account />
							<Account />
							<Account />
							<Account />
							<Account />
							<Account />
							<Account />
							<Account />
							<Account />
							<Account />
							<Account />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
