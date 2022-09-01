import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Contacts.module.scss';

import Contact from '@/components/Contact';
import { useTranslate } from '@/hooks';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Contacts({ contacts, currentUser, onChangeChat, onTab }) {
	const [currentSelected, setCurrentSelected] = useState(undefined);
	const [t] = useTranslate();

	const changeSelectedContact = (contact, index) => {
		setCurrentSelected(index);
		onChangeChat(contact);
		onTab(0);
	};

	return (
		<div className={cx('wrapper')}>
			{contacts.map((contact, index) => {
				return (
					<Contact
						currentUser={currentUser}
						onClick={() => changeSelectedContact(contact, index)}
						selected={currentSelected === index}
						key={index}
						item={contact}
						self={currentUser.phone === contact.phone}
						t={t}
					/>
				);
			})}
		</div>
	);
}
Contacts.propTypes = {
	contacts: PropTypes.array,
	onChangeChat: PropTypes.func,
	onTab: PropTypes.func,
};

export default Contacts;
