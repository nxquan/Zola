import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './FrontLayout.module.scss';
import Header from './Header';
import Footer from './Footer';
import images from '@/assets/images';

const cx = classNames.bind(styles);

function FrontLayout({ children }) {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<Header />
				<div className={cx('container')}>
					<div className={cx('content')}>{children}</div>
				</div>
				<Footer />
			</div>

			<div className={cx('bg')}>
				<img
					src={images.bg}
					className={cx('bg-svg')}
					alt='Background'
				/>
			</div>
		</div>
	);
}

FrontLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default FrontLayout;
