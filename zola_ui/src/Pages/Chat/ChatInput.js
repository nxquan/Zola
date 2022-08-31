import { BsEmojiSmile, BsCheckSquare } from 'react-icons/bs';
import { IoImageOutline } from 'react-icons/io5';
import { AiOutlineExclamation, AiFillLike } from 'react-icons/ai';
import { BiMessageEdit, BiScreenshot } from 'react-icons/bi';
import { FaRegAddressCard } from 'react-icons/fa';
import { IoMdAlarm } from 'react-icons/io';
import { MdFormatColorText, MdOutlineAttachFile } from 'react-icons/md';
import { FiAtSign } from 'react-icons/fi';

import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import ButtonIcon from '@/components/ButtonIcon';

import { useState, memo } from 'react';
import { useClickOutsideContainer } from '@/hooks';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function ChatInput({ currentChat, handleSendMsg, handleSendFile, scrollRef }) {
	const [msg, setMsg] = useState('');
	const { showEmoji, setShowEmoji, ref, containRef } = useClickOutsideContainer(false);

	const handleShowEmojiPicker = (e) => {
		if (ref.current && ref.current.contains(e.target)) {
			setShowEmoji(true);
		} else {
			setShowEmoji((prev) => !prev);
		}
	};

	const onEmojiSelect = (emojiObject) => {
		let curMsg = msg;
		if (msg.length === 0) {
			curMsg += emojiObject.native + ' ';
		} else {
			curMsg += ' ' + emojiObject.native + ' ';
		}
		setMsg(curMsg);
	};

	const sendChat = (msg) => {
		if (msg.length > 0) {
			handleSendMsg(msg);
			setMsg('');
		}
	};

	return (
		<div className={cx('chat-input')}>
			<div className={cx('chat-input-actions', 'chat-input-btns')}>
				<ButtonIcon className={cx('chat-input-btn')}>
					<BsEmojiSmile />
				</ButtonIcon>
				<ButtonIcon className={cx('chat-input-btn')}>
					<label htmlFor="input-image" className={cx('input-label')}>
						<IoImageOutline />
					</label>
					<input
						id="input-image"
						className={cx('input-file')}
						type="file"
						accept="image/png,image/jpeg,image/jpg"
						onChange={(e) => handleSendFile(e.target.files[0], 'IMAGE')}
					/>
				</ButtonIcon>
				<ButtonIcon className={cx('chat-input-btn')}>
					<label htmlFor="input-file" className={cx('input-label')}>
						<MdOutlineAttachFile />
					</label>
					<input
						id="input-file"
						className={cx('input-file')}
						type="file"
						onChange={(e) => handleSendFile(e.target.files[0])}
					/>
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
			<form
				className={cx('chat-input-text')}
				onSubmit={(e) => {
					e.preventDefault();
					sendChat(msg);
				}}
			>
				<input
					type="text"
					className={cx('input')}
					placeholder={`Nhập @, tin nhắn tới ${currentChat.username}`}
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
					onFocus={() => (scrollRef.current.scrollTop = scrollRef.current.scrollHeight)}
				/>
				<div className={cx('chat-input-btns')}>
					<ButtonIcon className={cx('chat-input-btn')}>
						<BiMessageEdit />
					</ButtonIcon>
					<div
						className={cx('chat-input-btn', 'emoji', { selected: showEmoji })}
						onClick={handleShowEmojiPicker}
						ref={containRef}
					>
						<BsEmojiSmile />
						{showEmoji && (
							<div className={cx('emoji-wrapper')} ref={ref}>
								<Picker
									data={data}
									theme="light"
									onEmojiSelect={onEmojiSelect}
									searchPosition="none"
									previewPosition="none"
									navPosition="bottom"
								/>
							</div>
						)}
					</div>
					<ButtonIcon disabled={msg.length > 0} className={cx('chat-input-btn')}>
						<FiAtSign />
					</ButtonIcon>
					<ButtonIcon
						className={cx('chat-input-btn', 'chat-input-btn--color')}
						onClick={(e) => sendChat(msg)}
						type="submit"
					>
						{!!msg ? <span className={cx('submit-text')}>GỬI</span> : <AiFillLike />}
					</ButtonIcon>
				</div>
			</form>
		</div>
	);
}

ChatInput.propTypes = {
	currentChat: PropTypes.object,
	handleSendFile: PropTypes.func,
	handleSendMsg: PropTypes.func,
};

export default memo(ChatInput);
