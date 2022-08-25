import { useEffect, useState, useRef, useCallback } from 'react';

import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

import axios from 'axios';
import { addMessage, getAllMessages, uploadFile, uploadImage } from '@/utils/APIRoute';

const cx = classNames.bind(styles);

function Chat({ currentUser, currentChat, socket, handleChangeChat }) {
	let curDate = new Date();
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const scrollRef = useRef();
	const getSendedTime = () => {
		let year = curDate.getFullYear();
		let month = curDate.getMonth() + 1;
		let day = curDate.getDate();
		let hour = curDate.getHours();
		let minute = curDate.getMinutes();
		let second = curDate.getSeconds();
		hour = Number(hour) - 7;
		if (hour < 0) {
			if (day === 1) {
				switch (month) {
					case (1, 3, 5, 7, 8, 10, 12):
						day = 31;
						break;
					case (4, 6, 9, 11):
						day = 30;
						break;
					default:
						if (year % 400 === 0 || (year % 4 === 0 && year % 100 === 1)) {
							day = 29;
						} else {
							day = 28;
						}
				}
				month -= 1;
			}
			day -= 1;
			hour = 24 - (7 - hour);
		}
		let textMonth = month < 10 ? '0' + month : month;
		let textDay = day < 10 ? '0' + day : day;
		let textHour = hour < 10 ? '0' + hour : hour;
		let textMinute = minute < 10 ? '0' + minute : minute;
		let textSecond = second < 10 ? '0' + second : second;

		return {
			year,
			month: textMonth,
			day: textDay,
			hour: textHour,
			minute: textMinute,
			second: textSecond,
		};
	};
	const handleSendMsg = useCallback(async (msg) => {
		await axios.post(addMessage, {
			from: currentUser._id,
			to: currentChat._id,
			message: msg,
		});

		socket.current.emit('send-msg', {
			from: currentUser._id,
			to: currentChat._id,
			message: {
				typeOfMessage: 'text',
				text: msg,
			},
		});

		setMessages((prev) => {
			const { year, month, day, hour, minute, second } = getSendedTime(curDate);
			return [
				...prev,
				{
					fromSelf: true,
					message: {
						typeOfMessage: 'text',
						text: msg,
					},
					sendedTime: `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`,
				},
			];
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSendFile = useCallback((file, type) => {
		switch (type) {
			case 'IMAGE': {
				let formData = new FormData();
				formData.append('image', file);
				formData.append('from', currentUser._id);
				formData.append('to', currentChat._id);
				axios
					.post(uploadImage, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then((res) => {
						let file = res.data.file;
						socket.current.emit('send-msg', {
							from: currentUser._id,
							to: currentChat._id,
							message: {
								typeOfMessage: 'file',
								file: file,
							},
						});
						setMessages((prev) => {
							const { year, month, day, hour, minute, second } =
								getSendedTime(curDate);
							return [
								...prev,
								{
									fromSelf: true,
									message: {
										typeOfMessage: 'file',
										file: file,
									},
									sendedTime: `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`,
								},
							];
						});
					})
					.catch((error) => {
						console.log(error);
					});
				break;
			}

			default: {
				let formData = new FormData();
				formData.append('file', file);
				formData.append('from', currentUser._id);
				formData.append('to', currentChat._id);
				axios
					.post(uploadFile, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then((res) => {
						let file = res.data.file;
						socket.current.emit('send-msg', {
							from: currentUser._id,
							to: currentChat._id,
							message: {
								typeOfMessage: 'file',
								file: file,
							},
						});
						setMessages((prev) => {
							const { year, month, day, hour, minute, second } =
								getSendedTime(curDate);
							return [
								...prev,
								{
									fromSelf: true,
									message: {
										typeOfMessage: 'file',
										file: file,
									},
									sendedTime: `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`,
								},
							];
						});
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			socket.current.on('receive-msg', (message) => {
				setArrivalMessage({
					fromSelf: false,
					message: message,
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
		const id = setTimeout(() => {
			if (scrollRef.current) {
				scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
			}
		}, 100);
		return () => clearTimeout(id);
	}, [messages]);

	return (
		<div className={cx('wrapper')}>
			<ChatHeader
				handleChangeChat={handleChangeChat}
				currentChat={currentChat}
				self={currentUser.phone === currentChat.phone}
			/>
			<ChatMessage messages={messages} ref={scrollRef} />
			<ChatInput
				handleSendMsg={handleSendMsg}
				handleSendFile={handleSendFile}
				currentChat={currentChat}
				scrollRef={scrollRef}
			/>
		</div>
	);
}

export default Chat;
