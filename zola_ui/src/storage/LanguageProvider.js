import { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
const LanguageContext = createContext();

function LanguageProvider({ children }) {
	const [t, i18n] = useTranslation();

	return <LanguageContext.Provider value={[t, i18n]}>{children}</LanguageContext.Provider>;
}

LanguageProvider.propTypes = {
	children: PropTypes.element,
};

export { LanguageContext };
export default LanguageProvider;
