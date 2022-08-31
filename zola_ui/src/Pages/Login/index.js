import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreenButton, faLock } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import axios from 'axios';
import images from '@/assets/images';
import Button from '@/components/Button';
import { loginRoute } from '@/utils/APIRoute';
import { useTranslate } from '@/hooks';

const cx = classNames.bind(styles);

const toastOptions = {
	position: 'bottom-right',
	autoClose: 5000,
	closeOnClick: true,
	draggable: true,
	theme: 'light',
};

function Login() {
	const [tab, setTab] = useState(1);
	const [loginQR, setLoginQR] = useState(true);
	const [account, setAccount] = useState({ phone: '', password: '' });
	const [t] = useTranslate();

	const navigate = useNavigate();
	const { phone, password } = account;

	const toggleTab = (e, index) => {
		e.preventDefault();
		setTab(index);
		if (index === 1) setLoginQR(true);
	};

	const handleForm = (e) => {
		setAccount({ ...account, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data } = await axios.post(loginRoute, {
			phone,
			password,
		});

		if (data.status) {
			await localStorage.setItem('account', JSON.stringify(account));
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
					{t('WithQRCode')}
				</a>
				<a
					href="/"
					className={cx('tab', { active: tab === 2 })}
					onClick={(e) => toggleTab(e, 2)}
				>
					{t('WithPassword')}
				</a>
			</div>
			<div className={cx('contents')}>
				<div className={cx('content-item', { active: tab === 1 }, { disabled: !loginQR })}>
					<div className={cx('error')}>
						<p>{t('QRExpiredAndRegenerate')}</p>
					</div>
					<div className={cx('qrcode')}>
						<img className={cx('qrcode-img')} src={images.download} alt="QR Code" />
						<div className={cx('qrcode-expired')}>
							<p>{t('QRExpired')}</p>
							<Button
								className={cx('qrcode-btn')}
								primary
								small
								onClick={() => setLoginQR(true)}
							>
								{t('Regenerate')}
							</Button>
						</div>
					</div>
					<p className={cx('note')}>{t('ScanQR')}</p>
				</div>
				<div className={cx('content-item', { active: tab === 2 })}>
					<form className={cx('form-signin')} onSubmit={(e) => handleSubmit(e)}>
						<div className={cx('form-group')}>
							<FontAwesomeIcon
								className={cx('form-icon')}
								icon={faMobileScreenButton}
							/>
							<input
								className={cx('form-input')}
								type="tel"
								placeholder={t('PhoneNumber')}
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
								placeholder={t('Password')}
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
								{t('LoginWithPass')}
							</Button>
							<Button
								outline
								disabled={phone.length >= 10 && password.length >= 6 ? false : true}
								large
							>
								{t('SendRequestLogin')}
							</Button>
							<Button text small to="/register">
								{t('ForgotPass')}
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
