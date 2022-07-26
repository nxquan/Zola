import classNames from 'classnames/bind';

import styles from './Chat.module.scss';
const cx = classNames.bind(styles);

function ChatMessage() {
	return <div className={cx('chat-message')}>Chat message</div>;
}

export default ChatMessage;
