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
import {useTranslate} from '@/hooks';

const cx = classNames.bind(styles);
const profileMenu = [
	{
		title: 'Profile',
		separate: true,
		type: 'PROFILE',
	},
	{
		title: 'Settings',
		type: 'SETTING',
	},
	{
		title: 'LogOut',
		className: 'warning',
		separate: true,
		type: 'LOG_OUT',
	},
];
const settingMenu = [
	{
		icon: <FiUser />,
		title: 'AccountInformation',
	},
	{
		icon: <BsGear />,
		title: 'Settings',
	},
	{
		icon: <ImFloppyDisk />,
		title: 'Storage',
		separate: true,
		children: [
			{
				title: 'ManageFiles',
			},
		],
	},
	{
		icon: <BsGlobe />,
		title: 'Language',
		children: [
			{
				title: 'Tiếng Việt',
				bio: 'vn',
				icon: <FontAwesomeIcon className={cx('language-icon', 'show')} icon={faCheck} />,
				type: 'LANGUAGE',
			},
			{
				title: 'English',
				bio: 'en',
				icon: <FontAwesomeIcon className={cx('language-icon')} icon={faCheck} />,
				type: 'LANGUAGE',
			},
		],
	},
	{
		icon: <AiOutlineExclamationCircle />,
		title: 'AboutZola',
		children: [
			{
				title: 'Version',
				type: 'INTRODUCTION',
			},
			{
				title: 'HelpCenter',
				type: 'INTRODUCTION',
			},
		],
	},
	{
		icon: <AiOutlineLogout />,
		title: 'LogOut',
		className: 'warning',
		separate: true,
		type: 'LOG_OUT',
	},
];

const typeMessage = [
	{
		title: 'ShowAllMessages',
		icon: <FontAwesomeIcon className={cx('message-icon', 'show')} icon={faCheck} />,
	},
	{
		title: 'ViewUnreadMessagesOnly',
		icon: <FontAwesomeIcon className={cx('message-icon')} icon={faCheck} />,
	},
	{
		title: 'MessageFromStrangerOnly',
		icon: <FontAwesomeIcon className={cx('message-icon')} icon={faCheck} />,
	},
];

const typeActionMenu = [
	{
		title: 'MarkAsRead',
	},
	{
		title: 'SendBroadcastMessages',
	},
	{
		title: 'SwitchToNewDesign',
		separate: true,
	},
];

function Sidebar({
	currentUser,
	setCurrentUser,
	contacts,
	setContacts,
	onChangeChat,
	hideSidebar,
}) {
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
	const [t, i18n] = useTranslate();

	const handleChangeSettingMenu = (menuItem) => {
		switch (menuItem.type) {
			case 'LOG_OUT':
				async function logOutUser() {
					await localStorage.removeItem('user');
					navigate('/login');
				}
				logOutUser();
				break;
			case 'LANGUAGE':
				i18n.changeLanguage(menuItem.bio);
				let selectedIndex;
				let languages = settingMenu[3].children;
				languages.forEach((language, index) => {
					language.icon = (
						<FontAwesomeIcon className={cx('language-icon')} icon={faCheck} />
					);
					if (language.bio === menuItem.bio) {
						selectedIndex = index;
					}
				});
				languages[selectedIndex].icon = (
					<FontAwesomeIcon className={cx('language-icon', 'show')} icon={faCheck} />
				);
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
					<Search
						currentUser={currentUser}
						contacts={contacts}
						setContacts={setContacts}
						onChangeChat={onChangeChat}
						t={t}
					/>
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
									{t('Labels')}
								</Button>
								<div className={cx('category-list', { active: showCategory })}>
									<div className={cx('category-item', 'active')}>
										<div className={cx('category-count')}>1</div>
										<Button rounded className={cx('category-btn')}>
											{t('AllLabels')}
										</Button>
									</div>
									<div className={cx('category-item')}>
										<Button rounded className={cx('category-btn')}>
											{t('Priority')}
										</Button>
									</div>
									<div className={cx('category-item')}>
										<Button rounded className={cx('category-btn')}>
											{t('Other')}
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
										{t('AllMessages')}
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
										{t('Action')}
									</button>
								</Tippy>
							</div>
							<div className={cx('inner')}>
								<Contacts
									onChangeChat={onChangeChat}
									currentUser={currentUser}
									contacts={contacts}
									t={t}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal showModal={showModal}>
				<Profile
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
					ref={modalRef}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			</Modal>
		</>
	);
}

export default Sidebar;
