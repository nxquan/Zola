import { useEffect, useState, useRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Image from '@/components/Image';
import axios from 'axios';
import {
	addMessage,
	getAllMessages,
	uploadFile,
	uploadImage,
	addInteractiveMessageRoute,
} from '@/utils/APIRoute';
import { BsBell, BsPinAngle } from 'react-icons/bs';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { GiAlarmClock } from 'react-icons/gi';
import { IoWarningOutline } from 'react-icons/io5';
import { FiTrash } from 'react-icons/fi';
import { useTranslate } from '@/hooks';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Chat({ currentUser, currentChat, socket, handleChangeChat }) {
	let curDate = new Date();
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [showSideInfo, setShowSideInfo] = useState(false);
	const [t] = useTranslate();

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
	const handleSendMsg = async (msg) => {
		axios
			.post(addMessage, {
				from: currentUser._id,
				to: currentChat._id,
				message: msg,
			})
			.then(({ data }) => {
				socket.current.emit('send-msg', {
					from: currentUser._id,
					to: currentChat._id,
					message: {
						typeOfMessage: 'text',
						text: msg,
					},
					_id: data._id,
					interactive: 'none',
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
							_id: data._id,
							interactive: 'none',
							sendedTime: `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`,
						},
					];
				});
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	};

	const handleSendFile = (file, type) => {
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
	};

	const handleSendInteractive = async (item, interactive) => {
		//save db
		await axios.post(addInteractiveMessageRoute, {
			_id: item._id,
			interactive,
		});
		//Send socket
		socket.current.emit('send-interactive', {
			from: currentUser._id,
			to: currentChat._id,
			_id: item._id,
			interactive: interactive,
		});

		//Self update
		setMessages((prevMessages) => {
			let selectedIndex;
			prevMessages.forEach((curMessage, index) => {
				if (curMessage._id === item._id) {
					selectedIndex = index;
				}
			});
			prevMessages[selectedIndex].interactive = interactive;
			return [...prevMessages];
		});
	};
	const handleChangeActions = (actionType) => {
		switch (actionType) {
			case 'SIDE_INFO':
				setShowSideInfo((prev) => !prev);

				break;

			default:
		}
	};
	useEffect(() => {
		async function fetchMessage() {
			const { data } = await axios.get(getAllMessages, {
				params: {
					from: currentUser._id,
					to: currentChat._id,
				},
			});
			setMessages((prev) => data.messages);
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
			socket.current.on('receive-msg', (data) => {
				setArrivalMessage({
					fromSelf: false,
					message: data.message,
					_id: data._id,
					interactive: data.interactive,
					sendedTime: `${years}-${months < 10 ? '0' + months : months}-${
						day < 10 ? '0' + day : day
					}T${hours < 10 ? '0' + hours : hours}:${
						minutes < 10 ? '0' + minutes : minutes
					}:${seconds < 10 ? '0' + seconds : seconds}.000Z`,
				});
			});

			socket.current.on('receive-interactive', (data) => {
				setMessages((prevMessages) => {
					let selectedIndex;
					prevMessages.forEach((curMessage, index) => {
						if (curMessage._id === data._id) {
							selectedIndex = index;
						}
					});
					prevMessages[selectedIndex].interactive = data.interactive;
					return [...prevMessages];
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
	}, [messages.length]);

	return (
		<div className={cx('wrapper')}>
			<div className={cx('conversation')}>
				<ChatHeader
					handleChangeChat={handleChangeChat}
					currentChat={currentChat}
					onChangeActions={handleChangeActions}
					showSideInfo={showSideInfo}
					self={currentUser.phone === currentChat.phone}
				/>
				<ChatMessage
					messages={messages}
					ref={scrollRef}
					onSendInteractive={handleSendInteractive}
				/>
				<ChatInput
					handleSendMsg={handleSendMsg}
					handleSendFile={handleSendFile}
					currentChat={currentChat}
					scrollRef={scrollRef}
				/>
			</div>
			{showSideInfo && (
				<div className={cx('infor')}>
					<div className={cx('infor-header')}>Conversation Info</div>
					<div className={cx('infor-body')}>
						<div className={cx('infor-body-heading')}>
							<Image
								src={currentChat.profilePicture}
								className={cx('infor-body-avatar')}
							/>
							<h4 className={cx('infor-body-name')}>{currentChat.username}</h4>
							<div className={cx('infor-body-controls')}>
								<div className={cx('infor-body-control')}>
									<div className={cx('infor-body-icon')}>
										<BsBell />
									</div>
									{t('Mute')}
								</div>
								<div className={cx('infor-body-control')}>
									<div className={cx('infor-body-icon')}>
										<BsPinAngle />
									</div>
									{t('Pin')}
								</div>
								<div className={cx('infor-body-control')}>
									<div className={cx('infor-body-icon')}>
										<AiOutlineUsergroupAdd />
									</div>
									{t('Create')} <br />
									{t('Group')}
								</div>
							</div>
						</div>
						<div className={cx('infor-body-actions')}>
							<div className={cx('infor-body-action')}>
								<GiAlarmClock />
								{t('ReminderBoard')}
							</div>
							<div className={cx('infor-body-action')}>
								<AiOutlineUsergroupAdd />
								{t('MutualGroup')}
							</div>

							<div className={cx('infor-body-action')}>
								<IoWarningOutline />
								{t('Report')}
							</div>
							<div className={cx('infor-body-action')}>
								<FiTrash />
								{t('DeleteChat')}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

Chat.propTypes = {
	currentUser: PropTypes.object,
	currentChat: PropTypes.object,
	handleChangeChat: PropTypes.func,
};

export default Chat;
