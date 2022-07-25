import classNames from 'classnames/bind';
import Slider from './Slider';
import styles from './Welcome.module.scss';

const cx = classNames.bind(styles);

function Welcome() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('header')}>
				<h2 className={cx('heading')}>
					Chào mừng đến với <span>Zalo PC!</span>
				</h2>
				<p className={cx('description')}>
					Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè
					được tối ưu hoá cho máy tính của bạn.
				</p>
			</div>
			<Slider />
		</div>
	);
}

export default Welcome;
