import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import {
	FaRegCommentDots,
	FaCommentDots,
	FaRegAddressBook,
	FaAddressBook,
	FaRegCheckSquare,
	FaCheckSquare,
	FaRegClock,
	FaClock,
} from 'react-icons/fa';

import {
	AiOutlineCloud,
	AiTwotoneCloud,
	AiOutlineExclamationCircle,
	AiOutlineLogout,
} from 'react-icons/ai';
import { IoBriefcase, IoBriefcaseOutline } from 'react-icons/io5';
import {
	BsGear,
	BsGearFill,
	BsGlobe,
	BsChevronDown,
	BsCaretDownFill,
	BsCaretRightFill,
} from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { ImFloppyDisk } from 'react-icons/im';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import Tippy from '@tippyjs/react/headless';
import WrapPopper from '@/components/Popper';
import Menu from '@/components/Popper/Menu';
import Search from '../Search';
import ButtonIcon from '@/components/ButtonIcon';
import Button from '@/components/Button';
import Contacts from '@/components/Contacts';
import Image from '@/components/Image';

import Modal from '@/components/Modal';
import Profile from '@/components/Profile';
const cx = classNames.bind(styles);
const profileMenu = [
	{
		title: 'Hồ sơ của bạn',
		separate: true,
		type: 'PROFILE',
	},
	{
		title: 'Cài đặt',
		type: 'SETTING',
	},
	{
		title: 'Đăng xuất',
		className: 'warning',
		separate: true,
		type: 'LOG_OUT',
	},
];
const settingMenu = [
	{
		icon: <FiUser />,
		title: 'Thông tin tài khoản',
	},
	{
		icon: <BsGear />,
		title: 'Cài đặt',
	},
	{
		icon: <ImFloppyDisk />,
		title: 'Lưu trữ',
		separate: true,
		children: [
			{
				title: 'Quản lý file',
			},
		],
	},
	{
		icon: <BsGlobe />,
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
		icon: <AiOutlineExclamationCircle />,
		title: 'Giới thiệu',
	},
	{
		icon: <AiOutlineLogout />,
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

function Sidebar({ currentUser, contacts, onChangeChat, hideSidebar }) {
	const [tab, setTab] = useState(0);
	const [isShowedMenu, setIsShowedMenu] = useState(false);
	const [isShowedTypeMessageMenu, setIsShowedTypeMessageMenu] = useState(false);
	const [isShowedTypeActionMenu, setIsShowedTypeActionMenu] = useState(false);
	const [showCategory, setShowCategory] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const modalRef = useRef(null);
	let profileMenuWithUser = [{ title: currentUser.username, heading: true }, ...profileMenu];
	const navigate = useNavigate();

	const handleChangeSettingMenu = (menuItem) => {
		switch (menuItem.type) {
			case 'LOG_OUT':
				async function logOutUser() {
					await localStorage.removeItem('user');
					navigate('/login');
				}
				logOutUser();
				break;
			default:
				console.log(menuItem);
		}
	};

	const handleChangeProfileMenu = (menuItem) => {
		switch (menuItem.type) {
			case 'LOG_OUT':
				async function logOutUser() {
					await localStorage.removeItem('user');
					navigate('/login');
				}
				logOutUser();
				break;
			case 'PROFILE':
				setShowModal((prev) => {
					return true;
				});
				setShowProfileMenu(false);
				break;
			default:
		}
	};

	useEffect(() => {
		function handleClickOutsideModal(e) {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				setShowModal(false);
			}
		}
		document.addEventListener('click', handleClickOutsideModal, true);
		return () => {
			document.removeEventListener('click', handleClickOutsideModal, true);
		};
	}, [modalRef]);

	return (
		<>
			<div className={cx('wrapper', { 'hide-aux-sidebar': hideSidebar })}>
				<div className={cx('main-bar')}>
					<div>
						<div className={cx('nav-tab-top')}>
							<Tippy
								appendTo={() => document.body}
								visible={showProfileMenu}
								offset={[0, 0]}
								interactive
								placement="right-end"
								render={(attrs) => (
									<div className="content" tabIndex="-1" {...attrs}>
										<WrapPopper>
											<Menu
												items={profileMenuWithUser}
												className={cx('profile-menu-list--width')}
												onChange={handleChangeProfileMenu}
											/>
										</WrapPopper>
									</div>
								)}
								onClickOutside={() => setShowProfileMenu(false)}
							>
								<div
									className={cx('nav-tab-avt')}
									onClick={() => setShowProfileMenu(true)}
								>
									<Image alt="Avatar" src={currentUser.profilePicture} />
								</div>
							</Tippy>
							<ButtonIcon
								className={cx('nav-tab-btn')}
								active={tab === 0}
								onClick={() => {
									setTab(0);
									onChangeChat(undefined);
								}}
							>
								{tab !== 0 ? <FaRegCommentDots /> : <FaCommentDots />}
							</ButtonIcon>
							<ButtonIcon
								className={cx('nav-tab-btn')}
								active={tab === 1}
								onClick={() => setTab(1)}
							>
								{tab !== 1 ? <FaRegAddressBook /> : <FaAddressBook />}
							</ButtonIcon>
							<ButtonIcon
								className={cx('nav-tab-btn')}
								active={tab === 2}
								onClick={() => setTab(2)}
							>
								{tab !== 2 ? <FaRegCheckSquare /> : <FaCheckSquare />}
							</ButtonIcon>
							<ButtonIcon
								className={cx('nav-tab-btn')}
								active={tab === 3}
								onClick={() => setTab(3)}
							>
								{tab !== 3 ? <FaRegClock /> : <FaClock />}
							</ButtonIcon>
						</div>
					</div>
					<div className={cx('nav-tab-bottom')}>
						<ButtonIcon
							className={cx('nav-tab-btn')}
							active={tab === 4}
							onClick={() => setTab(4)}
						>
							{tab !== 4 ? <AiOutlineCloud /> : <AiTwotoneCloud />}
						</ButtonIcon>
						<ButtonIcon
							className={cx('nav-tab-btn')}
							active={tab === 5}
							onClick={() => setTab(5)}
						>
							{tab !== 5 ? <IoBriefcaseOutline /> : <IoBriefcase />}
						</ButtonIcon>
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
											onChange={handleChangeSettingMenu}
										/>
									</WrapPopper>
								</div>
							)}
							onClickOutside={() => setIsShowedMenu(false)}
						>
							<ButtonIcon
								active={tab === 6}
								onClick={() => {
									setIsShowedMenu(true);
									setTab(6);
								}}
								className={cx('nav-tab-btn')}
							>
								{tab !== 6 ? <BsGear /> : <BsGearFill />}
							</ButtonIcon>
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
										showCategory ? <BsCaretDownFill /> : <BsCaretRightFill />
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
										<BsChevronDown />
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
								<Contacts onChangeChat={onChangeChat} contacts={contacts} />
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal showModal={showModal}>
				<Profile ref={modalRef} showModal={showModal} setShowModal={setShowModal} />
			</Modal>
		</>
	);
}

export default Sidebar;
