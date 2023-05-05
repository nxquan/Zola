import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreenButton, faLock, faAnglesLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toastify.scss';

import classNames from 'classnames/bind';
import styles from './Register.module.scss';

import Button from '@/components/Button';
import { registerRoute } from '@/utils/APIRoute';
import { useTranslate } from '@/hooks';
import { defaultToastOptions } from '@/utils/toastOption';
import FormGroup from '@/components/FormGroup';

const cx = classNames.bind(styles);

function Register() {
	const [account, setAccount] = useState({
		phone: '',
		username: '',
		password: '',
		confirmPassword: '',
	});
	const [t] = useTranslate();

	const { phone, username, password, confirmPassword } = account;

	const handleChangeValue = useCallback((e) => {
		const { name, value } = e.target;

		setAccount((prevState) => {
			return { ...prevState, [name]: value };
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const validateInput = () => {
		return phone.length >= process.env.REACT_APP_LEAST_LENGTH_PHONE &&
			username.length >= 1 &&
			password.length >= process.env.REACT_APP_LEAST_LENGTH_PASSWORD &&
			confirmPassword.length >= process.env.REACT_APP_LEAST_LENGTH_PASSWORD
			? false
			: true;
	};

	const validateUser = () => {
		if (!phone.startsWith('0') || phone.length < 10) {
			toast.error('Số điện thoại không hợp lệ', defaultToastOptions);
			return false;
		}
		if (password !== confirmPassword) {
			toast.error('Mật khẩu phải giống nhau!!', defaultToastOptions);
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		if (validateUser()) {
			const { data } = await axios.post(registerRoute, {
				phone,
				username,
				password,
			});

			if (data.result) {
				setAccount(() => ({
					phone: '',
					username: '',
					password: '',
					confirmPassword: '',
				}));
				toast.success(data.msg, defaultToastOptions);
			} else {
				toast.error(data.msg, defaultToastOptions);
			}
		}
	};

	return (
		<div className={cx('wrapper')}>
			<button className={cx('tab')}>{t('SignUp')}</button>
			<div className={cx('tab-pane')}>
				<form
					className={cx('form-signin')}
					onSubmit={(e) => e.preventDefault()}
				>
					<FormGroup
						icon={<FontAwesomeIcon icon={faMobileScreenButton} />}
						type='phone'
						placeholder={t('PhoneNumber')}
						name='phone'
						autoComplete='on'
						value={phone}
						onChange={handleChangeValue}
					/>

					<FormGroup
						icon={<FontAwesomeIcon icon={faUser} />}
						type='text'
						placeholder={t('Username')}
						name='username'
						autoComplete='on'
						value={username}
						onChange={handleChangeValue}
					/>

					<FormGroup
						icon={<FontAwesomeIcon icon={faLock} />}
						type='password'
						placeholder={t('Password')}
						name='password'
						value={password}
						onChange={handleChangeValue}
					/>

					<FormGroup
						icon={<FontAwesomeIcon icon={faLock} />}
						type='password'
						placeholder={t('ConfirmationPassword')}
						name='confirmPassword'
						value={confirmPassword}
						onChange={handleChangeValue}
					/>

					<Button
						primary
						disabled={validateInput()}
						large
						onClick={handleSubmit}
					>
						{t('SignUp')}
					</Button>
					<Button
						className={cx('icon-btn')}
						text
						small
						leftIcon={<FontAwesomeIcon icon={faAnglesLeft} />}
						to='/login'
					>
						{t('BackToLogin')}
					</Button>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Register;
