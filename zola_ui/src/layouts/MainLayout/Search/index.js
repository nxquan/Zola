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
import { searchUserRoute } from '@/utils/APIRoute';
import axios from 'axios';
import Modal from '@/components/Modal';
import ProfileFriend from '@/components/ProfileFriend';
import { useClickOutside, useDebounce } from '@/hooks';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Search({ currentUser, contacts, setContacts, t, onChangeChat }) {
	const [searchValue, setSearchValue] = useState('');
	const [showSearchResult, setShowSearchResult] = useState(false);
	const [results, setResults] = useState([]);
	const [currentFriend, setCurrentFriend] = useState();
	const debouncedValue = useDebounce(searchValue, 600);
	const [showModal, setShowModal] = useState(false);

	const inputRef = useRef();
	const childModalRef = useRef();
	useClickOutside(childModalRef, (e) => {
		setShowModal(false);
		setCurrentFriend(undefined);
	});

	const handleCloseModal = () => {
		setShowModal(false);
		setCurrentFriend(undefined);
	};
	const handleClear = () => {
		setSearchValue('');
		inputRef.current.focus();
	};

	useEffect(() => {
		async function searchUsers() {
			if (debouncedValue) {
				const { data } = await axios.get(searchUserRoute, {
					params: {
						value: debouncedValue,
					},
				});
				if (data.users.length > 0) {
					setResults(data.users);
				} else {
					setResults([]);
				}
			}
		}
		searchUsers();
	}, [debouncedValue]);

	useEffect(() => {
		if (!!currentFriend) {
			setShowModal(true);
		}
	}, [currentFriend]);

	return (
		<>
			<div className={cx('wrapper')}>
				<div className={cx('search')}>
					<Tippy
						visible={showSearchResult}
						interactive
						appendTo={() => document.body}
						placement="bottom-start"
						offset={[-15, 5]}
						render={(attrs) => (
							<div className="box" tabIndex="-1" {...attrs}>
								<div className={cx('account-list')}>
									<div className={cx('heading')}>{t('RecentSearch')}</div>
									<div className={cx('content')}>
										{results.length > 0 ? (
											results.map((item, index) => (
												<Account
													item={item}
													key={index}
													onClick={() => {
														setCurrentFriend(item);
													}}
												/>
											))
										) : (
											<div className={cx('no-users')}>{t('NoResult')}</div>
										)}
									</div>
								</div>
							</div>
						)}
						onClickOutside={() => {
							setShowSearchResult(false);
							setSearchValue('');
						}}
					>
						<div className={cx('form-group')}>
							<label htmlFor="form-input" className={cx('form-label')}>
								<IoSearchOutline />
							</label>
							<input
								id="form-input"
								className={cx('form-input')}
								placeholder={t('Search')}
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								ref={inputRef}
								onFocus={() => setShowSearchResult(true)}
								autoComplete="off"
							/>
							{!!searchValue && (
								<button className={cx('clear')} onClick={() => handleClear()}>
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
								{t('Close')}
							</Button>
						)}
					</div>
				</div>
			</div>
			{showModal && (
				<Modal showModal={showModal}>
					<ProfileFriend
						currentFriend={currentFriend}
						currentUserPhone={currentUser.phone}
						contacts={contacts}
						setContacts={setContacts}
						onClose={handleCloseModal}
						onChangeChat={onChangeChat}
						ref={childModalRef}
					/>
				</Modal>
			)}
		</>
	);
}

Search.propTypes = {
	currentUser: PropTypes.any,
	contacts: PropTypes.array,
	onChangeChat: PropTypes.func,
};
export default Search;
