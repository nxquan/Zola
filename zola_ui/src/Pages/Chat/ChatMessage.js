import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import ChatItem from './ChatItem';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

const ChatMessage = forwardRef(({ messages, onSendInteractive }, ref) => {
	return (
		<div className={cx('chat-message')} ref={ref}>
			{messages.map((item, index) => {
				let sameUser = false;
				if (index >= 1 && messages[index - 1].fromSelf === item.fromSelf) {
					sameUser = true;
				}
				return (
					<ChatItem
						key={index}
						item={item}
						sameUser={sameUser}
						onSendInteractive={onSendInteractive}
					/>
				);
			})}
		</div>
	);
});

ChatMessage.propTypes = {
	messages: PropTypes.array,
	onSendInteractive: PropTypes.func,
};

export default ChatMessage;
