import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import ChatItem from './ChatItem';

const cx = classNames.bind(styles);

function ChatMessage() {
	return <div className={cx('chat-message')}></div>;
}

export default ChatMessage;
