import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import ButtonIcon from '@/components/ButtonIcon';
import Button from '@/components/Button';
import Image from '@/components/Image';
import { GrClose } from 'react-icons/gr';
import { FaPencilAlt } from 'react-icons/fa';
import { forwardRef } from 'react';
import { animated, useTransition } from 'react-spring';

const cx = classNames.bind(styles);

const Profile = forwardRef(({ currentUser, showModal, setShowModal }, ref) => {
	const transitions = useTransition(showModal, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		delay: 200,
		config: {
			duration: 500,
		},
	});
	return transitions(
		(styles, item) =>
			item && (
				<animated.div className={cx('wrapper')} ref={ref} style={styles}>
					<div className={cx('header')}>
						<h4 className={cx('header-heading')}>Thông tin tài khoản</h4>
						<ButtonIcon
							className={cx('header-icon')}
							onClick={() => setShowModal(false)}
						>
							<GrClose />
						</ButtonIcon>
					</div>
					<div className={cx('body')}>
						<div className={cx('body-preview')}>
							<Image
								className={cx('cover-picture')}
								src="https://cover-talk.zadn.vn/d/8/8/2/2/d274934675a52c141be4e338f3cacd98.jpg"
							/>
							<Image
								className={cx('profile-picture')}
								src="https://s120-ava-talk.zadn.vn/6/0/f/8/10/120/d274934675a52c141be4e338f3cacd98.jpg"
							/>
							<h4>Quân Nguyễn</h4>
						</div>

						<div className={cx('body-infor')}>
							<h5>Thông tin cá nhân</h5>
							<div className={cx('body-detail')}>
								<span className={cx('body-name')}>Bio</span>
								<span className={cx('body-value')}>Online </span>
							</div>
							<div className={cx('body-detail')}>
								<span className={cx('body-name')}>Điện thoại</span>
								<span className={cx('body-value')}>+841648551850 </span>
							</div>
							<div className={cx('body-detail')}>
								<span className={cx('body-name')}>Giới tính</span>
								<span className={cx('body-value')}>Nam </span>
							</div>
							<div className={cx('body-detail')}>
								<span className={cx('body-name')}>Ngày sinh</span>
								<span className={cx('body-value')}>06 tháng 02, 2002 </span>
							</div>
						</div>
					</div>
					<Button leftIcon={<FaPencilAlt />} rounded large className={cx('edit-infor')}>
						Cập nhật thông tin
					</Button>
				</animated.div>
			)
	);
});

export default Profile;
