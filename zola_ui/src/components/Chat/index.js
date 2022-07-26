import classNames from 'classnames/bind';

import styles from './Chat.module.scss';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

import axios from 'axios';
import { addMessage } from '@/utils/APIRoute';

const cx = classNames.bind(styles);

function Chat({ currentUser, currentChat }) {
	const handleSendChat = async (msg) => {
		// eslint-disable-next-line no-unused-vars
		const { data } = await axios.post(addMessage, {
			from: currentUser._id,
			to: currentChat._id,
			message: msg,
		});
	};

	return (
		<div className={cx('wrapper')}>
			<ChatHeader currentChat={currentChat} />
			<ChatMessage />
			<ChatInput currentChat={currentChat} handleSendChat={handleSendChat} />
		</div>
	);
}

export default Chat;
