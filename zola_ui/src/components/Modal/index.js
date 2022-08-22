import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { useTransition, animated } from 'react-spring';
const cx = classNames.bind(styles);

function Modal({ children, showModal }) {
	const transitions = useTransition(showModal, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		delay: 200,
		config: {
			duration: 100,
		},
	});

	return transitions(
		(styles, child) =>
			child && (
				<animated.div style={styles} className={cx('wrapper')}>
					{children}
				</animated.div>
			)
	);
}

export default Modal;
