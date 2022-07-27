import classNames from 'classnames/bind';

import styles from './Chat.module.scss';
import Image from '@/components/Image';
const cx = classNames.bind(styles);

function ChatItem({ message, self, sameUser }) {
	return (
		<div className={cx('chat-item')}>
			<Image className={cx('chat-img')} />
			<div className={cx('chat-inner')}>
				<p className={cx('chat-content')}>Em bảo bạn nhanh chóng lên lấy bản chính rồi</p>
				<span className={cx('chat-time')}> 08:09</span>
			</div>
		</div>
	);
}

export default ChatItem;
