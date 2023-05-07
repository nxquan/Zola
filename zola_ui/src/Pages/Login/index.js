import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreenButton, faLock } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import Button from '@/components/Button';
import { useTranslate } from '@/hooks';
import FormGroup from '@/components/FormGroup';
import { defaultToastOptions } from '@/utils/toastOption';
import CryptoJS from 'crypto-js';
import * as authenService from '@/services/authenService'


const cx = classNames.bind(styles);

function Login() {
	const [account, setAccount] = useState({ phone: '', password: '' });
	const [t] = useTranslate();

	const navigator = useNavigate();
	const { phone, password } = account;

	const handleChangeValue = useCallback((e) => {
		const {name, value} = e.target

		setAccount(prevState => {
			return {
				...prevState,
				[name]: value
			}
		});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = await authenService.login({
			phone,
			password,
		});

		if (data.result) {
			const encryptedRefreshToken = CryptoJS.AES.encrypt(data.refreshToken, process.env.REACT_APP_PRIVATE_KEY).toString()
			localStorage.setItem('refresh_token', encryptedRefreshToken);
			navigator('/');
		} else {
			toast.error(data.msg, defaultToastOptions);
		}
	};

	const handleValidateInput = () => {
		return phone.length >= Number(process.env.REACT_APP_LEAST_LENGTH_PHONE) &&
			password.length >= Number(process.env.REACT_APP_LEAST_LENGTH_PASSWORD)
			? false
			: true;
	};

	return (
		<div className={cx('wrapper')}>
			<button className={cx('tab')}>{t('Login')}</button>
			<div className={cx('tab-pane')}>
				<form className={cx('form-signin')}>
					<FormGroup
						icon={<FontAwesomeIcon icon={faMobileScreenButton} />}
						type="tel"
						placeholder={t('PhoneNumber')}
						autoComplete="off"
						name="phone"
						value={phone}
						onChange={(e) => handleChangeValue(e)}
					/>

					<FormGroup
						icon={<FontAwesomeIcon icon={faLock} />}
						type="password"
						placeholder={t('Password')}
						autoComplete="off"
						name="password"
						value={password}
						onChange={(e) => handleChangeValue(e)}
					/>

					<div className={cx('form-btns')}>
						<Button
							primary
							disabled={handleValidateInput()}
							large
							onClick={handleSubmit}
						>
							{t('LoginWithPass')}
						</Button>
						<Button outline disabled={handleValidateInput()} large>
							{t('SendRequestLogin')}
						</Button>
						<Button text small to="/register">
							{t('ForgotPass')}
						</Button>
					</div>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Login;
