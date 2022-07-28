import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Chat.module.scss';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

import axios from 'axios';
import { addMessage, getAllMessages } from '@/utils/APIRoute';

const cx = classNames.bind(styles);

function Chat({ currentUser, currentChat, socket, handleChangeChat }) {
	let curDate = new Date();
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const scrollRef = useRef();

	const handleSendChat = async (msg) => {
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

		setMessages((prev) => {
			let years = curDate.getFullYear();
			let months = curDate.getMonth() + 1;
			let day = curDate.getDate();
			let hours = curDate.getHours();
			let minutes = curDate.getMinutes();
			let seconds = curDate.getSeconds();
			hours = Number(hours) - 7;
			if (hours < 0) {
				day += 1;
				hours = 24 - (7 - hours);
			}
			return [
				...prev,
				{
					fromSelf: true,
					message: msg,
					sendedTime: `${years}-${months < 10 ? '0' + months : months}-${
						day < 10 ? '0' + day : day
					}T${hours < 10 ? '0' + hours : hours}:${
						minutes < 10 ? '0' + minutes : minutes
					}:${seconds < 10 ? '0' + seconds : seconds}.000Z`,
				},
			];
		});
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
		let years = curDate.getFullYear();
		let months = curDate.getMonth() + 1;
		let day = curDate.getDate();
		let hours = curDate.getHours();
		let minutes = curDate.getMinutes();
		let seconds = curDate.getSeconds();
		hours = Number(hours) - 7;
		if (hours < 0) {
			day += 1;
			hours = 24 - (7 - hours);
		}
		if (socket.current) {
			socket.current.on('receive-msg', (msg) => {
				setArrivalMessage({
					fromSelf: false,
					message: msg,
					sendedTime: `${years}-${months < 10 ? '0' + months : months}-${
						day < 10 ? '0' + day : day
					}T${hours < 10 ? '0' + hours : hours}:${
						minutes < 10 ? '0' + minutes : minutes
					}:${seconds < 10 ? '0' + seconds : seconds}.000Z`,
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
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className={cx('wrapper')}>
			<ChatHeader handleChangeChat={handleChangeChat} currentChat={currentChat} />
			<ChatMessage messages={messages} ref={scrollRef} />
			<ChatInput
				currentChat={currentChat}
				handleSendChat={handleSendChat}
				scrollRef={scrollRef}
			/>
		</div>
	);
}

export default Chat;
