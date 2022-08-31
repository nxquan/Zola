import { memo } from 'react';

import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FiVideo } from 'react-icons/fi';
import { BsLayoutSidebarReverse, BsChevronLeft } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';

import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import Image from '@/components/Image';
import images from '@/assets/images';
import ButtonIcon from '@/components/ButtonIcon';
const cx = classNames.bind(styles);

function ChatHeader({ currentChat, handleChangeChat, onChangeActions, self }) {
	return (
		<div className={cx('header')}>
			<div className={cx('header-infor')}>
				<ButtonIcon
					className={cx('header-back-btn')}
					onClick={() => handleChangeChat(undefined)}
				>
					<BsChevronLeft />
				</ButtonIcon>
				<Image
					src={self ? images.cloudImage : currentChat.profilePicture}
					alt="Avatar"
					className={cx('header-avatar')}
				/>
				<div className={cx('header-inner')}>
					<h4 className={cx('header-name')}>
						{self ? 'Cloud của tôi' : currentChat.username}
					</h4>
					{!self && <p className={cx('header-status')}>Vừa truy cập</p>}
				</div>
			</div>
			<div className={cx('header-actions')}>
				<ButtonIcon className={cx('header-btn')}>
					<AiOutlineUsergroupAdd />
				</ButtonIcon>
				<ButtonIcon className={cx('header-btn')}>
					<IoSearchOutline />
				</ButtonIcon>
				<ButtonIcon className={cx('header-btn')}>
					<FiVideo />
				</ButtonIcon>
				<ButtonIcon
					className={cx('header-btn')}
					onClick={() => onChangeActions('SIDE_INFO')}
				>
					<BsLayoutSidebarReverse />
				</ButtonIcon>
			</div>
		</div>
	);
}

export default memo(ChatHeader);
