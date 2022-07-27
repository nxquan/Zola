import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Chat.module.scss';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

import axios from 'axios';
import { addMessage, getAllMessages } from '@/utils/APIRoute';

const cx = classNames.bind(styles);

function Chat({ currentUser, currentChat, socket }) {
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const scrollRef = useRef();

	const handleSendChat = async (msg) => {
		let curDate = new Date();
		await axios.post(addMessage, {
			from: currentUser._id,
			to: currentChat._id,
			message: msg,
		});

		socket.current.emit('send-msg', {
			from: currentUser._id,
			to: currentChat._id,
			msg,
		});

		setMessages((prev) => [
			...prev,
			{
				fromSelf: true,
				message: msg,
				sendedTime: `2022-07-26T${curDate.getHours() - 7}:${
					curDate.getMinutes() < 10 ? '0' + curDate.getMinutes() : curDate.getMinutes()
				}:34.677+00:00`,
			},
		]);
	};

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
		if (currentChat) {
			fetchMessage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChat]);

	useEffect(() => {
		let curDate = new Date();
		if (socket.current) {
			socket.current.on('msg-receive', (msg) => {
				setArrivalMessage({
					fromSelf: false,
					message: msg,
					sendedTime: `2022-07-26T${curDate.getHours() - 7}:${
						curDate.getMinutes() < 10
							? '0' + curDate.getMinutes()
							: curDate.getMinutes()
					}:34.677+00:00`,
				});
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!!arrivalMessage) {
			setMessages((prev) => [...prev, arrivalMessage]);
		}
	}, [arrivalMessage]);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
		}
	}, [messages]);

	return (
		<div className={cx('wrapper')}>
			<ChatHeader currentChat={currentChat} />
			<ChatMessage messages={messages} ref={scrollRef} />
			<ChatInput currentChat={currentChat} handleSendChat={handleSendChat} />
		</div>
	);
}

export default Chat;
