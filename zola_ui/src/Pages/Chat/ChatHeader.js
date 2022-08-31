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
import { useTranslate } from '@/hooks';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function ChatHeader({ currentChat, showSideInfo, handleChangeChat, onChangeActions, self }) {
	const [t] = useTranslate();

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
					{!self && <p className={cx('header-status')}>{t('Online')}</p>}
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
					className={cx('header-btn', { selected: showSideInfo })}
					onClick={() => onChangeActions('SIDE_INFO')}
				>
					<BsLayoutSidebarReverse />
				</ButtonIcon>
			</div>
		</div>
	);
}

ChatHeader.propTypes = {
	currentChat: PropTypes.object,
	handleChangeChat: PropTypes.func,
	onChangeActions: PropTypes.func,
};

export default memo(ChatHeader);
