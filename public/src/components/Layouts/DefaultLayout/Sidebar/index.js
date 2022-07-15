import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCommentDots,
	faAddressBook,
	faSquareCheck,
	faCloud,
	faBriefcase,
	faGear,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Search from '../Search';
import NavItem from '@/components/NavItem';
import images from '@/assets/images';
const cx = classNames.bind(styles);

function Sidebar({ children }) {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('main-bar')}>
				<div>
					<div className={cx('nav-tab-top')}>
						<div className={cx('nav-tab-avt')}>
							<img src={images.avt} />
						</div>
						<NavItem active to="/message">
							<FontAwesomeIcon icon={faCommentDots} />
						</NavItem>
						<NavItem to="/contact">
							<FontAwesomeIcon icon={faAddressBook} />
						</NavItem>
						<NavItem to="/todo">
							<FontAwesomeIcon icon={faSquareCheck} />
						</NavItem>
					</div>
				</div>
				<div className={cx('nav-tab-bottom')}>
					<NavItem to="/me">
						<FontAwesomeIcon icon={faCloud} />
					</NavItem>
					<NavItem to="/bag">
						<FontAwesomeIcon icon={faBriefcase} />
					</NavItem>
					<NavItem onClick={() => alert('123')}>
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
