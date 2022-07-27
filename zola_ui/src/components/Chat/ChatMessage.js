import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import ChatItem from './ChatItem';
import axios from 'axios';
import { getAllMessages } from '@/utils/APIRoute';

const cx = classNames.bind(styles);

function ChatMessage({ currentUser, currentChat }) {
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		async function fetchMessage() {
			const { data } = await axios.get(getAllMessages, {
				params: {
					from: currentUser._id,
					to: currentChat._id,
				},
			});
			if (data.status) {
				setMessages(data.messages);
			}
		}
		fetchMessage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChat]);

	return (
		<div className={cx('chat-message')}>
			{messages.map((item, index) => {
				let sameUser = false;
				if (index >= 1 && messages[index - 1].fromSelf === item.fromSelf) {
					sameUser = true;
				}
				return <ChatItem key={index} item={item} sameUser={sameUser} />;
			})}
		</div>
	);
}

export default ChatMessage;
