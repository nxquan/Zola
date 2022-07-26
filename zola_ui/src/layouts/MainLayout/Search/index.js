import { useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import { IoSearchOutline } from 'react-icons/io5';
import { FiUserPlus } from 'react-icons/fi';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaTimesCircle } from 'react-icons/fa';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import Button from '@/components/Button';
import ButtonIcon from '@/components/ButtonIcon';
const cx = classNames.bind(styles);

function Search() {
	const [searchValue, setSearchValue] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [showSearchResult, setShowSearchResult] = useState(false);

	const inputRef = useRef();
	return (
		<div className={cx('wrapper')}>
			<div className={cx('search')}>
				<Tippy
					appendTo={() => document.body}
					render={(attrs) => <div className="box" tabIndex="-1" {...attrs}></div>}
				>
					<div className={cx('form-group')}>
						<label htmlFor="form-input" className={cx('form-label')}>
							<IoSearchOutline />
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
								<FaTimesCircle />
							</button>
						)}
					</div>
				</Tippy>
				<div className={cx('form-btns')}>
					{!showSearchResult ? (
						<>
							<ButtonIcon className={cx('form-btn', 'form-btn--smaller')}>
								<FiUserPlus />
							</ButtonIcon>
							<ButtonIcon className={cx('form-btn')}>
								<AiOutlineUsergroupAdd />
							</ButtonIcon>
						</>
					) : (
						<Button className={cx('form-btn-close')} rounded>
							Đóng
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Search;
