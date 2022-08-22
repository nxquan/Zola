import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
	const [debouncedValue, setDebounceValue] = useState(value);

	useEffect(() => {
		const id = setTimeout(() => setDebounceValue(value), delay);

		return () => {
			clearTimeout(id);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
