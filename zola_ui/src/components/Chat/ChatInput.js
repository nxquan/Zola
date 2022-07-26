import { BsEmojiSmile, BsCheckSquare } from 'react-icons/bs';
import { IoImageOutline } from 'react-icons/io5';
import { AiOutlineExclamation, AiFillLike } from 'react-icons/ai';

import { BiMessageEdit, BiScreenshot } from 'react-icons/bi';
import { FaRegAddressCard, FaAt } from 'react-icons/fa';
import { IoMdAlarm } from 'react-icons/io';
import { MdFormatColorText, MdOutlineAttachFile } from 'react-icons/md';

import classNames from 'classnames/bind';
import ButtonIcon from '@/components/ButtonIcon';

import { useState } from 'react';
import Picker from 'emoji-picker-react';

import styles from './Chat.module.scss';
const cx = classNames.bind(styles);

function ChatInput({ currentChat }) {
	const [msg, setMsg] = useState('');
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const handleShowEmojiPicker = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};
	const onEmojiClick = (event, emojiObject) => {
		let curMsg = msg;
		curMsg += emojiObject.emoji;
		setMsg(curMsg);
	};
	return (
		<div className={cx('chat-input')}>
			<div className={cx('chat-input-actions', 'chat-input-btns')}>
				<ButtonIcon className={cx('chat-input-btn')}>
					<BsEmojiSmile />
				</ButtonIcon>
				<ButtonIcon className={cx('chat-input-btn')}>
					<IoImageOutline />
				</ButtonIcon>
				<ButtonIcon className={cx('chat-input-btn')}>
					<MdOutlineAttachFile />
				</ButtonIcon>
				<ButtonIcon className={cx('chat-input-btn')}>
					<BiScreenshot />
				</ButtonIcon>
				<ButtonIcon className={cx('chat-input-btn')}>
					<FaRegAddressCard />
				</ButtonIcon>
				<ButtonIcon className={cx('chat-input-btn')}>
					<IoMdAlarm />
				</ButtonIcon>
				<ButtonIcon className={cx('chat-input-btn')}>
					<BsCheckSquare />
				</ButtonIcon>
				<ButtonIcon className={cx('chat-input-btn')}>
					<MdFormatColorText />
				</ButtonIcon>
				<ButtonIcon className={cx('chat-input-btn')}>
					<AiOutlineExclamation />
				</ButtonIcon>
			</div>
			<div className={cx('chat-input-text')}>
				<input
					type="text"
					className={cx('input')}
					placeholder={`Nhập @, tin nhắn tới ${currentChat.username}`}
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
				/>
				<div className={cx('chat-input-btns')}>
					<ButtonIcon className={cx('chat-input-btn')}>
						<BiMessageEdit />
					</ButtonIcon>
					<div className={cx('chat-input-btn', 'emoji')} onClick={handleShowEmojiPicker}>
						<BsEmojiSmile />
						{showEmojiPicker && <Picker onEmojiClick={onEmojiClick} disableSearchBar />}
					</div>
					<ButtonIcon className={cx('chat-input-btn')}>
						<FaAt />
					</ButtonIcon>
					<ButtonIcon className={cx('chat-input-btn', 'chat-input-btn--color')}>
						<AiFillLike />
					</ButtonIcon>
				</div>
			</div>
		</div>
	);
}

export default ChatInput;
