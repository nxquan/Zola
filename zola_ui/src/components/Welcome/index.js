import classNames from 'classnames/bind';
import Slider from './Slider';
import styles from './Welcome.module.scss';
import { useTranslate } from '@/hooks';
const cx = classNames.bind(styles);

function Welcome({ className }) {
	const [t] = useTranslate();
	return (
		<div className={cx('wrapper', { [className]: className })}>
			<div className={cx('header')}>
				<h2 className={cx('heading')}>
					{t('Welcome')} <span>Zalo PC!</span>
				</h2>
				<p className={cx('description')}>{t('DescriptionZola')}</p>
			</div>
			<Slider />
		</div>
	);
}

export default Welcome;
