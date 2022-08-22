import { forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from './ProfileFriend.module.scss';

import ButtonIcon from '@/components/ButtonIcon';
import Image from '@/components/Image';
import { GrClose } from 'react-icons/gr';

const cx = classNames.bind(styles);

const ProfileFriend = forwardRef(({ currentUser, onClose }, ref) => {
	return (
		<div className={cx('wrapper')} ref={ref}>
			<div className={cx('header')}>
				<h4 className={cx('header-heading')}>Thông tin tài khoản</h4>
				<ButtonIcon className={cx('header-icon')} onClick={onClose}>
					<GrClose />
				</ButtonIcon>
			</div>
			<div className={cx('body')}>
				<div className={cx('body-preview')}>
					<Image className={cx('cover-picture')} src={currentUser.coverPicture} />
					<Image className={cx('profile-picture')} src={currentUser.profilePicture} />
					<h4>{currentUser.username}</h4>
				</div>
				{/* <div className={cx('body-actions')}>
					<Button rounded> Kết bạn</Button>
					<Button rounded> Nhắn tin </Button>
				</div> */}
				<div className={cx('body-infor')}>
					<h5>Thông tin cá nhân</h5>
					<div className={cx('body-detail')}>
						<span className={cx('body-name')}>Bio</span>
						<span className={cx('body-value')}>Online</span>
					</div>
					<div className={cx('body-detail')}>
						<span className={cx('body-name')}>Điện thoại</span>
						<span className={cx('body-value')}>+84{currentUser.phone.substr(1)}</span>
					</div>
					<div className={cx('body-detail')}>
						<span className={cx('body-name')}>Giới tính</span>
						<span className={cx('body-value')}>
							{currentUser.gender ? 'Nam' : 'Nữ'}{' '}
						</span>
					</div>
					<div className={cx('body-detail')}>
						<span className={cx('body-name')}>Ngày sinh</span>
						<span className={cx('body-value')}>
							{currentUser.birthday.day} tháng {currentUser.birthday.month},{' '}
							{currentUser.birthday.year}{' '}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
});

export default ProfileFriend;
