import classNames from 'classnames/bind';

import styles from './Chat.module.scss';
import Image from '@/components/Image';
const cx = classNames.bind(styles);

function ChatItem({ item, sameUser }) {
	let classes = cx('chat-item', { sender: item.fromSelf }, { 'same-user': sameUser });

	return (
		<div className={classes}>
			<Image className={cx('chat-img')} />
			<div className={cx('chat-inner')}>
				<p className={cx('chat-content')}>{item.message}</p>
				<span className={cx('chat-time')}> {item.sendedTime.substr(11, 5)}</span>
			</div>
		</div>
	);
}

export default ChatItem;
