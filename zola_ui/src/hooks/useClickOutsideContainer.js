import { useState, useEffect, useRef } from 'react';

function useClickOutsideContainer(initialValue) {
	const containRef = useRef(null);
	const ref = useRef(null);
	const [showEmoji, setShowEmoji] = useState(initialValue);

	const handleClickOutside = (e) => {
		if (
			ref.current &&
			!ref.current.contains(e.target) &&
			containRef.current &&
			!containRef.current.contains(e.target)
		) {
			setShowEmoji(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [ref]);

	return { showEmoji, setShowEmoji, ref, containRef };
}

export default useClickOutsideContainer;
