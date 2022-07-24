import classNames from 'classnames/bind';

import styles from './Contacts.module.scss';

import Contact from '@/components/Contact';

const cx = classNames.bind(styles);

function Contacts({ contacts }) {
	return (
		<div className={cx('wrapper')}>
			{contacts.map((contact, index) => {
				return <Contact key={index} item={contact} />;
			})}
		</div>
	);
}

export default Contacts;
