import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreenButton, faLock } from '@fortawesome/free-solid-svg-icons';

import images from '@/assets/images';
import Button from '@/components/Button';
import { loginRoute } from '@/utils/APIRoute';

const cx = classNames.bind(styles);

const toastOptions = {
	position: 'bottom-right',
	autoClose: 5000,
	closeOnClick: true,
	draggable: true,
	theme: 'light',
};

function Login() {
	const navigate = useNavigate();
	const [tab, setTab] = useState(1);
	const [loginQR, setLoginQR] = useState(true);
	const [user, SetUser] = useState({ phone: '', password: '' });
	const { phone, password } = user;

	const toggleTab = (e, index) => {
		e.preventDefault();
		setTab(index);
		if (index === 1) setLoginQR(true);
	};

	const handleForm = (e) => {
		SetUser({ ...user, [e.target.name]: e.target.value });
	};

	const hanldeSubmit = async (e) => {
		e.preventDefault();
		const { data } = await axios.post(loginRoute, {
			phone,
			password,
		});

		if (data.status) {
			await localStorage.setItem('user', JSON.stringify(user));
			navigate('/');
		} else {
			toast.error(data.msg, toastOptions);
		}
	};
	useEffect(() => {
		const id = setInterval(() => {
			setLoginQR((prev) => false);
		}, 60000);
		return () => clearInterval(id);
	}, []);

	return (
		<div className={cx('wrapper')}>
			<div className={cx('tabs')}>
				<a
					href="/"
					className={cx('tab', 'tab-pane', { active: tab === 1 })}
					onClick={(e) => toggleTab(e, 1)}
				>
					VỚI MÃ QR
				</a>
				<a
					href="/"
					className={cx('tab', { active: tab === 2 })}
					onClick={(e) => toggleTab(e, 2)}
				>
					VỚI SỐ ĐIỆN THOẠI
				</a>
			</div>
			<div className={cx('contents')}>
				<div className={cx('content-item', { active: tab === 1 }, { disabled: !loginQR })}>
					<div className={cx('error')}>
						<p>Mã QR đã hết hạn, vui lòng tải lại mã mới</p>
					</div>
					<div className={cx('qrcode')}>
						<img className={cx('qrcode-img')} src={images.download} alt="QR Code" />
						<div className={cx('qrcode-expired')}>
							<p>Mã QR hết hạn</p>
							<Button primary small onClick={() => setLoginQR(true)}>
								Lấy mã mới
							</Button>
						</div>
					</div>
					<p className={cx('note')}>Quét mã QR bằng Zalo để đăng nhập</p>
				</div>
				<div className={cx('content-item', { active: tab === 2 })}>
					<form className={cx('form-signin')} onSubmit={(e) => hanldeSubmit(e)}>
						<div className={cx('form-group')}>
							<FontAwesomeIcon
								className={cx('form-icon')}
								icon={faMobileScreenButton}
							/>
							<input
								className={cx('form-input')}
								type="tel"
								placeholder="Số điện thoại"
								autoComplete="off"
								name="phone"
								onChange={(e) => handleForm(e)}
							/>
						</div>
						<div className={cx('form-group')}>
							<FontAwesomeIcon className={cx('form-icon')} icon={faLock} />
							<input
								className={cx('form-input')}
								type="password"
								placeholder="Mật khẩu"
								autoComplete="off"
								name="password"
								onChange={(e) => handleForm(e)}
							/>
						</div>

						<div className={cx('form-btns')}>
							<Button
								primary
								disabled={phone.length >= 10 && password.length >= 6 ? false : true}
								large
								type="submit"
							>
								Đăng nhập với mật khẩu
							</Button>
							<Button
								outline
								disabled={phone.length >= 10 && password.length >= 6 ? false : true}
								large
							>
								Gửi yêu cầu đăng nhập
							</Button>
							<Button text small to="/register">
								Quên mật khẩu?
							</Button>
						</div>
					</form>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Login;
