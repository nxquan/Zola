import { createContext } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

function LanguageProvider({ children }) {
	const [t, i18n] = useTranslation();

	return <LanguageContext.Provider value={[t, i18n]}>{children}</LanguageContext.Provider>;
}

export { LanguageContext };
export default LanguageProvider;
