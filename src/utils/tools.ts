/**
 * Utility functions for string and number manipulation
 * Adapted from PrestaShop's ToolsCore PHP class
 */

/**
 * Available rounding modes
 */
export enum RoundMode {
  ROUND_UP = 0,
  ROUND_DOWN = 1,
  ROUND_HALF_UP = 2,
  ROUND_HALF_DOWN = 3,
  ROUND_HALF_EVEN = 4,
  ROUND_HALF_ODD = 5,
}

/**
 * Convert string to lowercase with UTF-8 support
 *
 * @param str String to convert
 * @returns Lowercase string
 */
export function strtolower(str: string | null): string | false {
  if (str === null || typeof str !== 'string') {
    return false
  }

  return str.toLowerCase()
}

/**
 * Convert string to uppercase with UTF-8 support
 *
 * @param str String to convert
 * @returns Uppercase string
 */
export function strtoupper(str: string | null): string | false {
  if (str === null || typeof str !== 'string') {
    return false
  }

  return str.toUpperCase()
}

/**
 * Make the first character uppercase
 *
 * @param str String to convert
 * @returns String with first character uppercase
 */
export function ucfirst(str: string): string {
  if (!str || typeof str !== 'string') {
    return ''
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Make the first character of each word uppercase
 *
 * @param str String to convert
 * @returns String with first character of each word uppercase
 */
export function ucwords(str: string): string {
  if (!str || typeof str !== 'string') {
    return ''
  }

  return str.replace(/\b\w/g, char => char.toUpperCase())
}

/**
 * Get string length with UTF-8 support
 *
 * @param str String to measure
 * @returns Length of the string
 */
export function strlen(str: string | null): number | false {
  if (str === null || typeof str !== 'string') {
    return false
  }

  return str.length
}

/**
 * Get substring from string with UTF-8 support
 *
 * @param str String to extract from
 * @param start Starting position
 * @param length Optional length
 * @returns Substring
 */
export function substr(
  str: string,
  start: number,
  length?: number,
): string | false {
  if (typeof str !== 'string') {
    return false
  }

  if (length === undefined) {
    return str.substring(start)
  }

  return str.substring(start, start + length)
}

/**
 * Find position of first occurrence of a substring in a string
 *
 * @param str String to search in
 * @param find String to find
 * @param offset Optional starting position
 * @returns Position of the match or -1 if not found
 */
export function strpos(str: string, find: string, offset: number = 0): number {
  if (typeof str !== 'string' || typeof find !== 'string') {
    return -1
  }

  const position = str.indexOf(find, offset)
  return position
}

/**
 * Find position of last occurrence of a substring in a string
 *
 * @param str String to search in
 * @param find String to find
 * @param offset Optional starting position (searching backwards from this point)
 * @returns Position of the match or -1 if not found
 */
export function strrpos(str: string, find: string, offset: number = 0): number {
  if (typeof str !== 'string' || typeof find !== 'string') {
    return -1
  }

  if (offset === 0) {
    return str.lastIndexOf(find)
  }

  // If offset is positive, we need to search from that position to the end
  if (offset > 0) {
    return str.substring(offset).lastIndexOf(find) + offset
  }

  // If offset is negative, we need to search from the beginning to (length - offset)
  const searchLength = str.length + offset
  if (searchLength <= 0) {
    return -1
  }

  return str.substring(0, searchLength).lastIndexOf(find)
}

/**
 * Truncate a string to a specified length and add suffix
 *
 * @param str String to truncate
 * @param maxLength Maximum length
 * @param suffix Suffix to add (default: '...')
 * @returns Truncated string
 */
export function truncate(
  str: string,
  maxLength: number,
  suffix: string = '...',
): string {
  if (typeof str !== 'string') {
    return ''
  }

  if (str.length <= maxLength) {
    return str
  }

  return str.substring(0, maxLength - suffix.length) + suffix
}

/**
 * Advanced string truncate with HTML support and more options
 *
 * @param text String to truncate
 * @param length Maximum length
 * @param options Options
 * @returns Truncated string
 */
export function truncateString(
  text: string,
  length: number = 120,
  options: {
    ellipsis?: string
    exact?: boolean
    html?: boolean
  } = {},
): string {
  const defaultOptions = {
    ellipsis: '...',
    exact: true,
    html: true,
  }

  const settings = {...defaultOptions, ...options}

  if (!text || typeof text !== 'string') {
    return ''
  }

  // If the text is shorter than the max length, return it
  if (text.length <= length) {
    return text
  }

  // For HTML content
  if (settings.html) {
    // If the plain text (without tags) is already short enough, return it
    if (text.replace(/<.*?>/g, '').length <= length) {
      return text
    }

    // This is a simplified version - a full HTML-aware truncation would be more complex
    // and require a parser to handle tags correctly
    const strippedText = text.replace(/<.*?>/g, '')
    const truncatedText = strippedText.substring(
      0,
      length - settings.ellipsis.length,
    )

    // If exact is false, try to cut at word boundary
    if (!settings.exact) {
      const lastSpace = truncatedText.lastIndexOf(' ')
      if (lastSpace > 0) {
        return truncatedText.substring(0, lastSpace) + settings.ellipsis
      }
    }

    return truncatedText + settings.ellipsis
  }

  // For plain text
  let truncatedText = text.substring(0, length - settings.ellipsis.length)

  // If exact is false, try to cut at word boundary
  if (!settings.exact) {
    const lastSpace = truncatedText.lastIndexOf(' ')
    if (lastSpace > 0) {
      return truncatedText.substring(0, lastSpace) + settings.ellipsis
    }
  }

  return truncatedText + settings.ellipsis
}

/**
 * Round a value with specified precision and rounding mode
 *
 * @param value Value to round
 * @param precision Decimal precision
 * @param roundMode Rounding mode (default: ROUND_HALF_UP)
 * @returns Rounded value
 */
export function ps_round(
  value: number,
  precision: number = 0,
  roundMode: RoundMode = RoundMode.ROUND_HALF_UP,
): number {
  if (isNaN(value) || isNaN(precision)) {
    return NaN
  }

  // Calculate precision factor (e.g., 1, 10, 100, etc.)
  const precisionFactor = Math.pow(10, precision)

  // Multiply value by precision factor
  let tempValue = value * precisionFactor

  // Apply different rounding modes
  switch (roundMode) {
    case RoundMode.ROUND_UP:
      // Always round up (ceil)
      tempValue = Math.ceil(tempValue)
      break

    case RoundMode.ROUND_DOWN:
      // Always round down (floor)
      tempValue = Math.floor(tempValue)
      break

    case RoundMode.ROUND_HALF_UP:
      // Round up if fraction >= 0.5
      tempValue = Math.round(tempValue)
      break

    case RoundMode.ROUND_HALF_DOWN:
      // Round down if fraction <= 0.5
      const fraction = tempValue - Math.floor(tempValue)
      tempValue = fraction > 0.5 ? Math.ceil(tempValue) : Math.floor(tempValue)
      break

    case RoundMode.ROUND_HALF_EVEN:
      // Round to nearest even integer if fraction is 0.5
      const intPart = Math.floor(tempValue)
      const fractional = tempValue - intPart

      if (fractional < 0.5) {
        tempValue = intPart
      } else if (fractional > 0.5) {
        tempValue = intPart + 1
      } else {
        // If fractional is exactly 0.5, round to the nearest even number
        tempValue = intPart % 2 === 0 ? intPart : intPart + 1
      }
      break

    case RoundMode.ROUND_HALF_ODD:
      // Round to nearest odd integer if fraction is 0.5
      const intValue = Math.floor(tempValue)
      const fract = tempValue - intValue

      if (fract < 0.5) {
        tempValue = intValue
      } else if (fract > 0.5) {
        tempValue = intValue + 1
      } else {
        // If fractional is exactly 0.5, round to the nearest odd number
        tempValue = intValue % 2 === 0 ? intValue + 1 : intValue
      }
      break
  }

  // Divide by precision factor to get the rounded value
  return tempValue / precisionFactor
}

export default {
  strtolower,
  strtoupper,
  ucfirst,
  ucwords,
  strlen,
  substr,
  strpos,
  strrpos,
  truncate,
  truncateString,
  ps_round,
  RoundMode,
}
