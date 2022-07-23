import { useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import {
	faCaretDown,
	faCaretRight,
	faCircleXmark,
	faMagnifyingGlass,
	faUser,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import Button from '@/components/Button';
import WrapperMenu from '@/components/Popper';
const cx = classNames.bind(styles);

function Search() {
	const [searchValue, setSearchValue] = useState('');
	const [showCategory, setShowCategory] = useState(false);
	const [showSearchResult, setShowSearchResult] = useState(false);

	const inputRef = useRef();
	return (
		<div className={cx('wrapper')}>
			<div className={cx('search')}>
				<Tippy render={(attrs) => <div className="box" tabIndex="-1" {...attrs}></div>}>
					<div className={cx('form-group')}>
						<label for="form-input">
							<FontAwesomeIcon className={cx('form-icon')} icon={faMagnifyingGlass} />
						</label>
						<input
							id="form-input"
							className={cx('form-input')}
							placeholder="Tìm kiếm"
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							ref={inputRef}
						/>
						{!!searchValue && (
							<button
								className={cx('clear')}
								onClick={() => {
									setSearchValue('');
									inputRef.current.focus();
								}}
							>
								<FontAwesomeIcon icon={faCircleXmark} />
							</button>
						)}
					</div>
				</Tippy>
				<div className={cx('form-btns')}>
					{!showSearchResult ? (
						<>
							<button className={cx('form-btn')}>
								<FontAwesomeIcon icon={faUser} />
							</button>
							<button className={cx('form-btn')}>
								<FontAwesomeIcon icon={faUsers} />
							</button>
						</>
					) : (
						<Button className={cx('form-btn-close')} rounded>
							Đóng
						</Button>
					)}
				</div>
			</div>

			<div className={cx('category')}>
				<Button
					className={cx('category-btn--open')}
					text
					leftIcon={
						showCategory ? (
							<FontAwesomeIcon icon={faCaretDown} />
						) : (
							<FontAwesomeIcon icon={faCaretRight} />
						)
					}
					onClick={() => setShowCategory(!showCategory)}
				>
					Phân loại
				</Button>
				<div className={cx('category-list', { active: showCategory })}>
					<div className={cx('category-item', 'active')}>
						<div className={cx('category-count')}>1</div>
						<Button rounded className={cx('category-btn')}>
							Tất cả
						</Button>
					</div>
					<div className={cx('category-item')}>
						<Button rounded className={cx('category-btn')}>
							ƯU TIÊN
						</Button>
					</div>
					<div className={cx('category-item')}>
						<Button rounded className={cx('category-btn')}>
							KHÁC
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;
