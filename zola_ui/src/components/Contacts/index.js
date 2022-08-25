import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Contacts.module.scss';

import Contact from '@/components/Contact';
import { useTranslate } from '@/hooks';

const cx = classNames.bind(styles);

function Contacts({ contacts, currentUser, onChangeChat }) {
	const [currentSelected, setCurrentSelected] = useState(undefined);
	const [t] = useTranslate();

	const changeSelectedContact = (contact, index) => {
		setCurrentSelected(index);
		onChangeChat(contact);
	};

	return (
		<div className={cx('wrapper')}>
			{contacts.map((contact, index) => {
				return (
					<Contact
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

export default Contacts;
