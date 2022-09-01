/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';

import styles from './Contact.module.scss';
import Image from '@/components/Image';
import images from '@/assets/images';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getLatestMessageRoute } from '@/utils/APIRoute';

const cx = classNames.bind(styles);

function Contact({ currentUser, selected, item, self, t, onClick }) {
	let classes = cx('wrapper', { selected });
	const [latestMessage, setLatestMessage] = useState({
		fromSelf: false,
		message: {},
	});

	useEffect(() => {
		async function getLatestMessage() {
			const { data } = await axios.get(getLatestMessageRoute, {
				params: {
					from: currentUser._id,
					to: item._id,
				},
			});
			setLatestMessage(data.message);
		}
		const id = setTimeout(getLatestMessage, 5000);

		return () => clearTimeout(id);
	}, []);

	return (
		<div className={classes} onClick={onClick}>
			<Image
				src={self ? images.cloudImage : item.profilePicture}
				alt="Avatar"
				className={cx('avatar')}
			/>
			<div className={cx('infor')}>
				<h3 className={cx('name')}>{self ? t('MyCloud') : item.username}</h3>
				<p className={cx('message')}>
					{latestMessage && self ? (
						<></>
					) : (
						<>
							<span>{latestMessage.fromSelf ? t('You') : item.username}:</span>
							{latestMessage.message.typeOfMessage === 'file'
								? latestMessage.message.file.filename
								: latestMessage.message.text}
						</>
					)}
				</p>
			</div>
		</div>
	);
}

Contact.propTypes = {
	item: PropTypes.object,
	onClick: PropTypes.func,
};
export default Contact;
