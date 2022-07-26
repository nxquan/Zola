import classNames from 'classnames/bind';

import styles from './Chat.module.scss';
import Image from '../Image';

import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FiVideo } from 'react-icons/fi';
import { BsLayoutSidebarReverse } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';
import ButtonIcon from '../ButtonIcon';

const cx = classNames.bind(styles);

function ChatHeader({ currentChat }) {
	return (
		<div className={cx('header')}>
			<div className={cx('header-infor')}>
				<Image
					src={currentChat.profilePicture}
					alt="Avatar"
					className={cx('header-avatar')}
				/>
				<div className={cx('header-inner')}>
					<h4 className={cx('header-name')}>{currentChat.username}</h4>
					<p className={cx('header-status')}>Vừa truy cập</p>
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
				<ButtonIcon className={cx('header-btn')}>
					<BsLayoutSidebarReverse />
				</ButtonIcon>
			</div>
		</div>
	);
}

export default ChatHeader;