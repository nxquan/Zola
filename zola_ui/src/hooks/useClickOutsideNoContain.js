import { useState, useEffect, useRef } from 'react';

function useOutsideClickNoContain(initialValue) {
	const modalRef = useRef(null);
	const [showModal, setShowModal] = useState(initialValue);

	const handleClickOutside = (e) => {
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			setShowModal(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [modalRef]);

	return { showModal, setShowModal, modalRef };
}

export default useOutsideClickNoContain;
