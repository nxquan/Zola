import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('more-action')}>
				<p>
					Bạn chưa có tài khoản?
					<Link to="/register">Đăng ký ngay!</Link>
				</p>
			</div>

			<div className={cx('inner')}>
				<div className={cx('languages')}>
					<a href="/" className={cx('lang', 'active')}>
						Tiếng Việt
					</a>
					<a href="/" className={cx('lang')}>
						English
					</a>
				</div>
				<p>Dùng tài khoản Zalo để truy cập các ứng dụng của ZA</p>
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
