import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

const SUPPORTED_LANGUAGES = ['en', 'es']
const DEFAULT_LANGUAGE = 'en'


i18n
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
  })

export default i18n
