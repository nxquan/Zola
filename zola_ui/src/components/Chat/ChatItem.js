import classNames from 'classnames/bind';

import styles from './Chat.module.scss';
import Image from '@/components/Image';
const cx = classNames.bind(styles);

function ChatItem({ item, sameUser }) {
	let classes = cx('chat-item', { sender: item.fromSelf }, { 'same-user': sameUser });
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

	return (
		<div className={classes}>
			<Image className={cx('chat-img')} />
			<div className={cx('chat-inner')}>
				<p className={cx('chat-content')}>{item.message}</p>
				<span className={cx('chat-time')}>
					{textHours}:{minutes}
				</span>
			</div>
		</div>
	);
}

export default ChatItem;
