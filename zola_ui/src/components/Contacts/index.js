import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Contacts.module.scss';

import Contact from '@/components/Contact';

const cx = classNames.bind(styles);

function Contacts({ contacts, onChangeChat }) {
	const [currentSelected, setCurrentSelected] = useState(undefined);

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
					/>
				);
			})}
		</div>
	);
}

export default Contacts;
