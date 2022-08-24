import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import images from '@/assets/images';

const cx = classNames.bind(styles);

function Image({ src, alt, className, ...props }) {
	let classes = cx('wrapper', { [className]: className });

	return (
		<img
			className={classes}
			src={src || images.noImage}
			alt={alt}
			{...props}
			onError={(e) => {
				e.target.src = images.noImage;
			}}
		/>
	);
}

export default Image;
