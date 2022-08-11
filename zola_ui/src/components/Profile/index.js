import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import ButtonIcon from '@/components/ButtonIcon';
import Button from '@/components/Button';
import Image from '@/components/Image';
import { GrClose } from 'react-icons/gr';
import { FaPencilAlt } from 'react-icons/fa';
import { forwardRef } from 'react';
import { animated, useTransition } from 'react-spring';
import Tippy from '@tippyjs/react/headless';
import WrapPopper from '@/components/Popper';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';

const cx = classNames.bind(styles);

const Profile = forwardRef(({ currentUser, showModal, setShowModal }, ref) => {
	const [showEdit, setShowEdit] = useState(false);
	const [showSetBirthday, setShowSetBirthday] = useState({
		day: false,
		month: false,
		year: false,
	});
	const [birthday, setBirthday] = useState({
		day: 1,
		month: 1,
		year: 2022,
	});
	const [username, setUsername] = useState(currentUser.username);
	const [gender, setGender] = useState(0);
	const [coverPicture, setCoverPicture] = useState(undefined);
	const [profilePicture, setProfilePicture] = useState(undefined);
	const [submit, setSubmit] = useState(false);

	const renderDaysOfMonth = (month) => {
		let days;
		if (
			month === 1 ||
			month === 3 ||
			month === 5 ||
			month === 7 ||
			month === 8 ||
			month === 10 ||
			month === 12
		) {
			days = 31;
		} else if (month === 2 || month === 6 || month === 9 || month == 11) {
			days = 30;
		} else {
			if (
				birthday.year % 400 === 0 ||
				(birthday.year % 4 === 0 && birthday.year % 100 !== 0)
			) {
				days = 29;
			} else {
				days = 28;
			}
		}
		let renderDays = [];
		for (let i = 1; i <= days; i++) {
			renderDays.push(i);
		}
		return renderDays.map((day) => {
			return (
				<div
					className={cx('calendar-item', { 'calendar-item--pick': day === birthday.day })}
					key={day}
					onClick={() => {
						setBirthday((prev) => ({
							...prev,
							day: day,
						}));
						setSubmit(true);
					}}
				>
					<AiOutlineCheck />
					{day}
				</div>
			);
		});
	};
	const renderMonths = () => {
		let renderMonth = [];
		for (let i = 1; i <= 12; i++) {
			renderMonth.push(i);
		}
		return renderMonth.map((month) => {
			return (
				<div
					className={cx('calendar-item', {
						'calendar-item--pick': month === birthday.month,
					})}
					key={month}
					onClick={() => {
						setBirthday((prev) => ({
							...prev,
							month: month,
						}));
						setSubmit(true);
					}}
				>
					<AiOutlineCheck />
					{month}
				</div>
			);
		});
	};
	const renderYears = () => {
		let renderMonth = [];
		let curDate = new Date();
		for (let i = curDate.getFullYear() - 80; i <= curDate.getFullYear(); i++) {
			renderMonth.push(i);
		}
		return renderMonth.map((year) => {
			return (
				<div
					className={cx('calendar-item', {
						'calendar-item--pick': year === birthday.year,
					})}
					key={year}
					onClick={() => {
						setBirthday((prev) => ({
							...prev,
							year: year,
						}));
						setSubmit(true);
					}}
				>
					<AiOutlineCheck />
					{year}
				</div>
			);
		});
	};
	const transitions = useTransition(showModal, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		delay: 200,
		config: {
			duration: 500,
		},
	});

	useEffect(() => {
		return () => {
			coverPicture && URL.revokeObjectURL(coverPicture.urlPreview);
		};
	}, [coverPicture]);

	useEffect(() => {
		return () => {
			profilePicture && URL.revokeObjectURL(profilePicture.urlPreview);
		};
	}, [profilePicture]);

	const handleChangeCoverPicture = (e) => {
		let file = e.target.files[0];
		file.urlPreview = URL.createObjectURL(file);
		setCoverPicture(file);
		setSubmit(true);
	};

	const handleChangeProfilePicture = (e) => {
		let file = e.target.files[0];
		file.urlPreview = URL.createObjectURL(file);
		setProfilePicture(file);
		setSubmit(true);
	};
	return transitions(
		(styles, item) =>
			item &&
			((!showEdit && (
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
							<Image className={cx('cover-picture')} src={currentUser.coverPicture} />
							<Image
								className={cx('profile-picture')}
								src={currentUser.profilePicture}
							/>
							<h4>{currentUser.username}</h4>
						</div>

						<div className={cx('body-infor')}>
							<h5>Thông tin cá nhân</h5>
							<div className={cx('body-detail')}>
								<span className={cx('body-name')}>Bio</span>
								<span className={cx('body-value')}>Online </span>
							</div>
							<div className={cx('body-detail')}>
								<span className={cx('body-name')}>Điện thoại</span>
								<span className={cx('body-value')}>
									+84{currentUser.phone.substr(1)}
								</span>
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
					<Button
						leftIcon={<FaPencilAlt />}
						rounded
						large
						className={cx('edit-infor')}
						onClick={() => setShowEdit(true)}
					>
						Cập nhật thông tin
					</Button>
				</animated.div>
			)) || (
				<animated.div className={cx('wrapper', 'wrapper-edit')} ref={ref} style={styles}>
					<div className={cx('header')}>
						<h4 className={cx('header-heading')}>Cập nhật thông tin</h4>
						<ButtonIcon
							className={cx('header-icon')}
							onClick={() => setShowModal(false)}
						>
							<GrClose />
						</ButtonIcon>
					</div>
					<div className={cx('body')}>
						<div className={cx('body-preview')}>
							<label htmlFor="cover-picture">
								<Image
									className={cx('cover-picture')}
									src={
										coverPicture
											? coverPicture.urlPreview
											: currentUser.coverPicture
									}
								/>
								<input
									type="file"
									id="cover-picture"
									onChange={(e) => handleChangeCoverPicture(e)}
								/>
							</label>
							<label htmlFor="profile-picture">
								<Image
									className={cx('profile-picture')}
									src={
										profilePicture
											? profilePicture.urlPreview
											: currentUser.profilePicture
									}
								/>
								<input
									type="file"
									id="profile-picture"
									onChange={(e) => handleChangeProfilePicture(e)}
								/>
							</label>
						</div>

						<div className={cx('body-infor')}>
							<div className={cx('form-group')}>
								<label htmlFor="input-username" className={cx('form-label')}>
									Tên hiển thị
								</label>
								<input
									id="input-username"
									name="username"
									className={cx('form-control')}
									placeholder="Nhập tên hiển thị"
									value={username}
									onChange={(e) => {
										setUsername(e.target.value);
										setSubmit(true);
									}}
								/>
								<span className={cx('form-note')}>
									Sử dụng tên thật để bạn bè dễ dàng nhận diện hơn
								</span>
							</div>

							<div className={cx('body-inner')}>
								<h5>Thông tin cá nhân</h5>
								<div className={cx('form-group')}>
									<label htmlFor="input-gender" className={cx('form-label')}>
										Giới tính
									</label>
									<div className={cx('form-inner')}>
										<input
											type="radio"
											id="input-gender"
											name="username"
											className={cx('form-control--radio')}
											onChange={() => {
												setGender(1);
												setSubmit(true);
											}}
										/>
										<span>Nam</span>
										<input
											type="radio"
											id="input-gender"
											name="username"
											className={cx('form-control--radio')}
											onChange={() => {
												setGender(0);
												setSubmit(true);
											}}
										/>
										<span>Nữ</span>
									</div>
								</div>
								<div className={cx('form-group')}>
									<label htmlFor="input-birthday" className={cx('form-label')}>
										Ngày sinh
									</label>
									<div className={cx('form-group--birthday')}>
										<Tippy
											visible={showSetBirthday.day}
											interactive
											offset={[0, 1]}
											placement="top-start"
											render={(attrs) => (
												<div className="content" tabIndex="-1" {...attrs}>
													<WrapPopper className={cx('calendar')}>
														{renderDaysOfMonth(birthday.month)}
													</WrapPopper>
												</div>
											)}
											onClickOutside={() => {
												setShowSetBirthday((prev) => ({
													day: false,
													month: false,
													year: false,
												}));
											}}
										>
											<div
												className={cx('input-birthday')}
												onClick={() =>
													setShowSetBirthday((prev) => ({
														day: true,
														month: false,
														year: false,
													}))
												}
											>
												{birthday.day}
												<BsChevronDown />
											</div>
										</Tippy>
										<Tippy
											visible={showSetBirthday.month}
											interactive
											offset={[0, 1]}
											placement="top-start"
											render={(attrs) => (
												<div className="content" tabIndex="-1" {...attrs}>
													<WrapPopper className={cx('calendar')}>
														{renderMonths()}
													</WrapPopper>
												</div>
											)}
											onClickOutside={() => {
												setShowSetBirthday((prev) => ({
													day: false,
													month: false,
													year: false,
												}));
											}}
										>
											<div
												className={cx('input-birthday')}
												onClick={() =>
													setShowSetBirthday((prev) => ({
														day: false,
														month: true,
														year: false,
													}))
												}
											>
												{birthday.month}
												<BsChevronDown />
											</div>
										</Tippy>

										<Tippy
											visible={showSetBirthday.year}
											interactive
											offset={[0, 1]}
											placement="top-start"
											render={(attrs) => (
												<div className="content" tabIndex="-1" {...attrs}>
													<WrapPopper className={cx('calendar')}>
														{renderYears()}
													</WrapPopper>
												</div>
											)}
											onClickOutside={() => {
												setShowSetBirthday((prev) => ({
													day: false,
													month: false,
													year: false,
												}));
											}}
										>
											<div
												className={cx('input-birthday')}
												onClick={() => {
													setShowSetBirthday((prev) => ({
														day: false,
														month: false,
														year: true,
													}));
												}}
											>
												{birthday.year}
												<BsChevronDown />
											</div>
										</Tippy>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={cx('footer')}>
						<Button
							primary
							className={cx('footer-btn', 'footer-btn--cancel')}
							onClick={() => setShowModal(false)}
						>
							Hủy
						</Button>
						<Button
							primary
							disabled={!submit}
							className={cx('footer-btn', 'footer-btn--submit')}
						>
							Cập nhật
						</Button>
					</div>
				</animated.div>
			))
	);
});

export default Profile;
