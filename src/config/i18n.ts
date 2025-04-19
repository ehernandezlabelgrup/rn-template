import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as RNLocalize from 'react-native-localize'
import {api} from './api'

// Idiomas soportados por la aplicación
const SUPPORTED_LANGUAGES = ['en', 'es']
const DEFAULT_LANGUAGE = 'en'

// Definir tipos para el detector de idioma
interface LanguageDetectorType {
  type: string
  async: boolean
  detect: (callback: (lng: string) => void) => Promise<void>
  init: () => void
  cacheUserLanguage: (lng: string) => Promise<void>
}

// Detector de idioma personalizado
const LANGUAGE_DETECTOR: LanguageDetectorType = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lng: string) => void): Promise<void> => {
    try {
      // Intentar obtener el idioma guardado
      const savedLanguage = await AsyncStorage.getItem('user-language')

      if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
        return callback(savedLanguage)
      }

      // Si no hay idioma guardado, detectar desde el dispositivo
      const deviceLanguage = RNLocalize.getLocales()[0].languageCode
      const supportedLanguage = SUPPORTED_LANGUAGES.includes(deviceLanguage)
        ? deviceLanguage
        : DEFAULT_LANGUAGE

      return callback(supportedLanguage)
    } catch (error) {
      console.log('Error detecting language:', error)
      return callback(DEFAULT_LANGUAGE)
    }
  },
  init: (): void => {},
  cacheUserLanguage: async (language: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('user-language', language)
    } catch (error) {
      console.log('Error caching language:', error)
    }
  },
}

// Definir tipos para el backend
interface TranslationBackendType {
  type: string
  init: () => void
  read: (
    language: string,
    namespace: string,
    callback: (err: Error | null, data?: any) => void,
  ) => Promise<void>
}

// Backend personalizado para cargar traducciones desde API
const TRANSLATION_BACKEND: TranslationBackendType = {
  type: 'backend',
  init: (): void => {},
  read: async (
    language: string,
    namespace: string,
    callback: (err: Error | null, data?: any) => void,
  ): Promise<void> => {
    try {
      // Cargar traducciones desde la API
      const response = await api.get(`/translations/${language}`)

      if (response.data && response.data.success) {
        // Asumiendo que el API devuelve un objeto con traducciones
        return callback(null, response.data.data)
      } else {
        // Si hay un error en la respuesta
        console.log(
          'Error loading translations:',
          response.data?.message || 'Unknown error',
        )
        return callback(new Error('Failed to load translations'), null)
      }
    } catch (error) {
      console.log('Error fetching translations:', error)

      // Si falla la carga desde API, intentar cargar desde caché local
      try {
        const cachedTranslations = await AsyncStorage.getItem(
          `translations_${language}`,
        )
        if (cachedTranslations) {
          return callback(null, JSON.parse(cachedTranslations))
        }
      } catch (cacheError) {
        console.log('Error reading cached translations:', cacheError)
      }

      // Si todo falla, devolver un error
      return callback(
        error instanceof Error ? error : new Error('Unknown error'),
        null,
      )
    }
  },
}

// Función para almacenar traducciones en caché
const cacheTranslations = async (
  language: string,
  data: any,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(`translations_${language}`, JSON.stringify(data))
  } catch (error) {
    console.log('Error caching translations:', error)
  }
}

// Configurar i18next
i18n
  .use(LANGUAGE_DETECTOR as any)
  .use(TRANSLATION_BACKEND as any)
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
    defaultNS: 'common',
    ns: ['common', 'validation', 'errors'],
  })

// Función para cambiar el idioma manualmente
export const changeLanguage = async (language: string): Promise<boolean> => {
  if (SUPPORTED_LANGUAGES.includes(language)) {
    await i18n.changeLanguage(language)
    return true
  }
  return false
}

// Función para recargar traducciones (útil si se actualizan en el servidor)
export const reloadTranslations = async (): Promise<boolean> => {
  const currentLang = i18n.language

  try {
    const response = await api.get(`/translations/${currentLang}`)

    if (response.data && response.data.success) {
      // Actualizar las traducciones en i18next
      Object.keys(response.data.data).forEach(namespace => {
        i18n.addResourceBundle(
          currentLang,
          namespace,
          response.data.data[namespace],
          true,
          true,
        )
      })

      // Guardar en caché
      await cacheTranslations(currentLang, response.data.data)

      return true
    }
    return false
  } catch (error) {
    console.log('Error reloading translations:', error)
    return false
  }
}

export default i18n
