import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCommentDots,
	faAddressBook,
	faSquareCheck,
	faCloud,
	faBriefcase,
	faGear,
	faClockFour,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Search from '../Search';
import NavItem from '@/components/NavItem';
import images from '@/assets/images';
const cx = classNames.bind(styles);

function Sidebar({ children }) {
	const [tab, setTab] = useState(0);

	return (
		<div className={cx('wrapper')}>
			<div className={cx('main-bar')}>
				<div>
					<div className={cx('nav-tab-top')}>
						<div className={cx('nav-tab-avt')}>
							<img src={images.avt} />
						</div>
						<NavItem active={tab === 0} onClick={() => setTab(0)} to="/message">
							<FontAwesomeIcon icon={faCommentDots} />
						</NavItem>

						<NavItem active={tab === 1} onClick={() => setTab(1)} to="/contact">
							<FontAwesomeIcon icon={faAddressBook} />
						</NavItem>
						<NavItem active={tab === 2} onClick={() => setTab(2)} to="/todo">
							<FontAwesomeIcon icon={faSquareCheck} />
						</NavItem>
						<NavItem active={tab === 3} onClick={() => setTab(3)} to="/diary">
							<FontAwesomeIcon icon={faClockFour} />
						</NavItem>
					</div>
				</div>
				<div className={cx('nav-tab-bottom')}>
					<NavItem active={tab === 4} onClick={() => setTab(4)} to="/me">
						<FontAwesomeIcon icon={faCloud} />
					</NavItem>
					<NavItem active={tab === 5} onClick={() => setTab(5)}>
						<FontAwesomeIcon icon={faBriefcase} />
					</NavItem>
					<NavItem active={tab === 6} onClick={() => setTab(6)}>
						<FontAwesomeIcon icon={faGear} />
					</NavItem>
				</div>
			</div>
			<div className={cx('aux-bar')}>
				<Search />
				<div className={cx('container')}>
					<div className={cx('content')}>{children}</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
