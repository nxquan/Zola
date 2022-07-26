import classNames from 'classnames/bind';

import styles from './Chat.module.scss';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const cx = classNames.bind(styles);

function Chat({ currentUser, currentChat }) {
	return (
		<div className={cx('wrapper')}>
			<ChatHeader currentChat={currentChat} />
			<ChatMessage />
			<ChatInput currentChat={currentChat} />
		</div>
	);
}

export default Chat;
