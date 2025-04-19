import dayjs from 'dayjs'
import 'dayjs/locale/es' // Importamos la localización en español
import 'dayjs/locale/en' // Importamos la localización en inglés
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(relativeTime) // Para calcular tiempos relativos (ej: 'hace 5 minutos')
dayjs.extend(localizedFormat) // Para usar formatos localizados (ej: 'LL' para fecha larga local)
dayjs.extend(utc) // Para trabajar con fechas UTC
dayjs.extend(timezone) // Para manejar zonas horarias
dayjs.extend(customParseFormat) // Para analizar fechas en formatos personalizados
dayjs.extend(duration) // Para trabajar con duraciones
dayjs.extend(isBetween) // Para verificar si una fecha está entre otras dos
dayjs.extend(isSameOrBefore) // Para verificar si una fecha es igual o anterior a otra
dayjs.extend(isSameOrAfter) // Para verificar si una fecha es igual o posterior a otra
dayjs.extend(updateLocale) // Para actualizar configuraciones de localización

// Función para configurar el idioma de dayjs
export const configureDayjs = (locale: string = 'es') => {
  // Establecemos la localización
  dayjs.locale(locale)
}

// Por defecto, inicializamos con español
configureDayjs('es')

// Personalización de la localización española (ejemplo)
dayjs.updateLocale('es', {
  weekdays: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthsShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ],
  relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: 'unos segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años',
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY HH:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY HH:mm',
  },
})

// Función para cambiar el idioma dinámicamente
export const changeDayjsLanguage = (locale: string) => {
  if (['es', 'en'].includes(locale)) {
    dayjs.locale(locale)
    return true
  }
  return false
}

// Funciones de utilidad para formatear fechas comunes
export const formatDateHelpers = {
  // Formato corto de fecha (ej: 01/01/2023)
  shortDate: (date: string | Date | number) => dayjs(date).format('L'),

  // Formato largo de fecha (ej: 1 de enero de 2023)
  longDate: (date: string | Date | number) => dayjs(date).format('LL'),

  // Formato de fecha y hora (ej: 01/01/2023 12:00)
  dateTime: (date: string | Date | number) => dayjs(date).format('L LT'),

  // Formato largo de fecha y hora (ej: 1 de enero de 2023 12:00)
  longDateTime: (date: string | Date | number) => dayjs(date).format('LLL'),

  // Tiempo relativo (ej: hace 5 minutos)
  relativeTime: (date: string | Date | number) => dayjs(date).fromNow(),

  // Solo hora (ej: 12:00)
  time: (date: string | Date | number) => dayjs(date).format('LT'),

  // Personalizado
  custom: (date: string | Date | number, format: string) =>
    dayjs(date).format(format),
}

// Funciones de utilidad para manipulación de fechas
export const dateHelpers = {
  diff: (
    date1: string | Date | number,
    date2: string | Date | number,
    unit: dayjs.QUnitType | dayjs.OpUnitType = 'millisecond',
  ) => dayjs(date1).diff(dayjs(date2), unit),

  // Verificar si una fecha está entre dos fechas
  isBetween: (
    date: string | Date | number,
    from: string | Date | number,
    to: string | Date | number,
  ) => dayjs(date).isBetween(from, to),

  // Verificar si dos fechas son iguales (con granularidad opcional)
  isSame: (
    date1: string | Date | number,
    date2: string | Date | number,
    unit?: dayjs.OpUnitType,
  ) => dayjs(date1).isSame(dayjs(date2), unit),
}

export default dayjs
