import classNames from 'classnames/bind';

import styles from './Chat.module.scss';
import Image from '@/components/Image';
import { AiOutlineFile } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import data from '@emoji-mart/data';
import { init } from 'emoji-mart';

init({ data });
const cx = classNames.bind(styles);

function ChatItem({ item, sameUser, onSendInteractive }) {
	let classes = cx(
		'chat-item',
		{ sender: item.fromSelf },
		{ 'same-user': sameUser },
		{
			'chat-item--img': item.message.file && item.message.file.typeOfFile === 'image',
		}
	);

	let hours = item.sendedTime.substr(11, 2);
	let textHours;
	let minutes = item.sendedTime.substr(14, 2);
	hours = Number(hours) + 7;
	if (hours < 10) {
		textHours = '0' + hours.toString();
	} else if (hours >= 24) {
		hours -= 24;
		textHours = '0' + hours.toString();
	} else {
		textHours = hours.toString();
	}
	function renderContent() {
		let fileSize = 0;
		let fileUnit = '';
		if (item.message.typeOfMessage === 'file') {
			if (item.message.file.size && item.message.file.typeOfFile !== 'image') {
				fileSize = item.message.file.size;
				if (fileSize > 1024 * 1024) {
					fileUnit = 'MB';
					fileSize /= 1024 * 1024;
				} else if (fileSize > 1024) {
					fileUnit = 'KB';
					fileSize /= 1024;
				} else {
					fileUnit = 'Byte';
				}
				fileSize = fileSize.toFixed(2);
			}
		}
		if (item.message.typeOfMessage === 'text') {
			return item.message.text;
		} else if (item.message.file.typeOfFile === 'image') {
			return (
				<Image className={cx('chat-image')} src={item.message.file.url} alt="sended-Img" />
			);
		} else {
			return (
				<a
					className={cx('chat-file')}
					href={item.message.file.url}
					target="_blank"
					rel="noreferrer"
				>
					<div className={cx('chat-file-icon')}>
						<AiOutlineFile></AiOutlineFile>
					</div>
					<div className={cx('chat-file-infor')}>
						<span className={cx('chat-file-name')}>{item.message.file.filename}</span>
						<span className={cx('chat-file-size')}>{`${fileSize} ${fileUnit}`}</span>
					</div>
				</a>
			);
		}
	}
	return (
		<div className={classes}>
			<Image className={cx('chat-img')} />
			<div className={cx('chat-inner')}>
				<div className={cx('chat-content')}>{renderContent()}</div>
				<span className={cx('chat-time')}>
					{textHours}:{minutes}
				</span>
				<div className={cx('interactive', { show: item.interactive === 'like' })}>
					<span
						className={cx('current-emotion')}
						onClick={() => {
							if (item.interactive === 'like') {
								onSendInteractive(item, 'none');
							} else {
								onSendInteractive(item, 'like');
							}
						}}
					>
						{item.interactive === 'like' ? (
							<em-emoji id="+1" size="0.8em"></em-emoji>
						) : (
							<BiLike />
						)}
					</span>
					<div className={cx('emotions')}></div>
				</div>
			</div>
		</div>
	);
}

export default ChatItem;
