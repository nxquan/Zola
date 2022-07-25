import classNames from 'classnames/bind';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

function SlideDots({ slides, handleChangeSlide, currentSlide }) {
	return (
		<div className={cx('slide-dots')}>
			{slides.map((slide) => (
				<span
					key={slide.id}
					className={cx('slide-dot', { active: currentSlide === slide.id })}
					onClick={() => handleChangeSlide('', slide.id)}
				></span>
			))}
		</div>
	);
}

export default SlideDots;
