import { LanguageContext } from '@/storage';
import { useContext } from 'react';

function useTranslate() {
	const [i, i18n] = useContext(LanguageContext);

	return [i, i18n];
}

export default useTranslate;
