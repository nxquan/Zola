import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import { IoSearchOutline } from 'react-icons/io5';
import { FiUserPlus } from 'react-icons/fi';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaTimesCircle } from 'react-icons/fa';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import Account from '@/components/Account';
import Button from '@/components/Button';
import ButtonIcon from '@/components/ButtonIcon';
const cx = classNames.bind(styles);

function Search() {
	const [searchValue, setSearchValue] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [showSearchResult, setShowSearchResult] = useState(false);
	const [accounts, setAccounts] = useState([]);

	const inputRef = useRef();

	const handleFocus = () => {
		setSearchValue('');
		inputRef.current.focus();
	};

	useEffect(() => {
		if (searchValue.length > 0) {
			setAccounts([1, 2, 3]);
		}
	}, [searchValue]);

	return (
		<div className={cx('wrapper')}>
			<div className={cx('search')}>
				<Tippy
					visible={showSearchResult && accounts.length > 0}
					interactive
					appendTo={() => document.body}
					placement="bottom-start"
					offset={[-15, 5]}
					render={(attrs) => (
						<div className="box" tabIndex="-1" {...attrs}>
							<div className={cx('account-list')}>
								<div className={cx('heading')}>Tìm kiếm gần đây</div>
								<div className={cx('content')}>
									{accounts.map((account, index) => (
										<Account />
									))}
								</div>
							</div>
						</div>
					)}
					onClickOutside={() => setShowSearchResult(false)}
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
							onFocus={() => setShowSearchResult(true)}
						/>
						{!!searchValue && (
							<button className={cx('clear')} onClick={() => handleFocus()}>
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
						<Button
							className={cx('form-btn-close')}
							rounded
							onClick={() => {
								setShowSearchResult(false);
								setSearchValue('');
							}}
						>
							Đóng
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Search;
