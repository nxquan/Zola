import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import { useTranslate } from '@/hooks';

const cx = classNames.bind(styles);

function Footer() {
	const [t, i18n] = useTranslate();

	const handleChangeLanguage = (lang) => {
		i18n.changeLanguage(lang);
	};
	return (
		<div className={cx('wrapper')}>
			<div className={cx('more-action')}>
				<p>
					{t('HaveAccount')}
					<Link to="/register">{t('RegisterNow')}</Link>
				</p>
			</div>

			<div className={cx('inner')}>
				<div className={cx('languages')}>
					<a
						href="/"
						className={cx('lang', { active: i18n.language === 'vn' })}
						onClick={(e) => {
							e.preventDefault();
							handleChangeLanguage('vn');
						}}
					>
						Tiếng Việt
					</a>
					<a
						href="/"
						className={cx('lang', { active: i18n.language === 'en' })}
						onClick={(e) => {
							e.preventDefault();
							handleChangeLanguage('en');
						}}
					>
						English
					</a>
				</div>
				<p>{t('OtherApp')}</p>
				<div className={cx('logos')}>
					<ul>
						<li>
							<a
								href="https://zalo.me"
								target="_blank"
								rel="noreferrer"
								className={cx('logo-zalo')}
							>
								<i className={cx('logo-zalo')}></i>
							</a>
						</li>
						<li>
							<a
								href="https://zalo.me"
								target="_blank"
								rel="noreferrer"
								className={cx('logo-mp3')}
							>
								<i className={cx('logo-mp3')}></i>
							</a>
						</li>
						<li>
							<a
								href="https://zalo.me"
								target="_blank"
								rel="noreferrer"
								className={cx('logo-zingtv')}
							>
								<i className={cx('logo-zingtv')}></i>
							</a>
						</li>
						<li>
							<a
								href="https://zalo.me"
								target="_blank"
								rel="noreferrer"
								className={cx('logo-zing')}
							>
								<i className={cx('logo-zing')}></i>
							</a>
						</li>
						<li>
							<a
								href="https://zalo.me"
								target="_blank"
								rel="noreferrer"
								className={cx('logo-baomoi')}
							>
								<i className={cx('logo-baomoi')}></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Footer;
