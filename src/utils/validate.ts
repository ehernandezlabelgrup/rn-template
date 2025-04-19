/**
 * Utility class with validation methods.
 * Inspired by PrestaShop's ValidateCore class but adapted for JavaScript/TypeScript.
 */

// Define tipos para mensajes y reglas
type ValidationMessage = string | ((param: any) => string)

interface ValidationRules {
  [field: string]: {
    required?: boolean
    type?: string
    message?: string
    minLength?: number
    maxLength?: number
    exactLength?: number
    pattern?: RegExp
    validate?: (value: any, data: any) => boolean | string
  }
}

interface ValidationErrors {
  [field: string]: string | null
}

/**
 * Validate utilities for common form validations and data checks
 */
export class Validate {
  /**
   * Regexp patterns
   */
  static EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  static URL_PATTERN =
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/
  static PHONE_PATTERN = /^[+0-9. ()\/-]*$/
  static POSTAL_CODE_PATTERN = /^[a-zA-Z 0-9-]+$/
  static PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
  static USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,20}$/
  static PRICE_PATTERN = /^[0-9]{1,10}(\.[0-9]{1,9})?$/
  static NEGATIVE_PRICE_PATTERN = /^[-]?[0-9]{1,10}(\.[0-9]{1,9})?$/
  static POSITIVE_INT_PATTERN = /^[1-9][0-9]*$/

  /**
   * Default error messages
   */
  static DEFAULT_MESSAGES: Record<string, ValidationMessage> = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    url: 'Please enter a valid URL',
    phoneNumber: 'Please enter a valid phone number',
    postalCode: 'Please enter a valid postal code',
    password:
      'Password must be at least 8 characters and include letters and numbers',
    username:
      'Username must be 3-20 characters and may include letters, numbers, underscore and hyphen',
    numeric: 'Please enter a numeric value',
    integer: 'Please enter a whole number',
    positiveInteger: 'Please enter a positive whole number',
    float: 'Please enter a valid number',
    price: 'Please enter a valid price',
    date: 'Please enter a valid date',
    minLength: (min: number): string =>
      `Please enter at least ${min} characters`,
    maxLength: (max: number): string =>
      `Please enter no more than ${max} characters`,
    exact: (exact: number): string =>
      `Please enter exactly ${exact} characters`,
    pattern: 'Invalid format',
    invalid: 'Invalid value',
  }

  /**
   * Check for email validity.
   *
   * @param {string} email Email to validate
   * @returns {boolean} Validity is ok or not
   */
  static isEmail(email: unknown): boolean {
    if (!email || typeof email !== 'string') {
      return false
    }

    return this.EMAIL_PATTERN.test(email)
  }

  /**
   * Check for URL validity.
   *
   * @param {string} url URL to validate
   * @returns {boolean} Validity is ok or not
   */
  static isUrl(url: unknown): boolean {
    if (!url || typeof url !== 'string') {
      return false
    }

    return this.URL_PATTERN.test(url)
  }

  /**
   * Check for a float number validity.
   *
   * @param {number|string} float Float number to validate
   * @returns {boolean} Validity is ok or not
   */
  static isFloat(float: unknown): boolean {
    if (float === null || float === undefined || float === '') {
      return false
    }

    return !isNaN(parseFloat(String(float))) && isFinite(Number(float))
  }

  /**
   * Check for a positive float number validity.
   *
   * @param {number|string} float Float number to validate
   * @returns {boolean} Validity is ok or not
   */
  static isUnsignedFloat(float: unknown): boolean {
    return this.isFloat(float) && parseFloat(String(float)) >= 0
  }

  /**
   * Check for price validity.
   *
   * @param {number|string} price Price to validate
   * @returns {boolean} Validity is ok or not
   */
  static isPrice(price: unknown): boolean {
    if (price === null || price === undefined || price === '') {
      return false
    }

    return this.PRICE_PATTERN.test(String(price))
  }

  /**
   * Check for price validity (including negative price).
   *
   * @param {number|string} price Price to validate
   * @returns {boolean} Validity is ok or not
   */
  static isNegativePrice(price: unknown): boolean {
    if (price === null || price === undefined || price === '') {
      return false
    }

    return this.NEGATIVE_PRICE_PATTERN.test(String(price))
  }

  /**
   * Check for phone number validity.
   *
   * @param {string} number Phone number to validate
   * @returns {boolean} Validity is ok or not
   */
  static isPhoneNumber(number: unknown): boolean {
    if (!number || typeof number !== 'string') {
      return false
    }

    return this.PHONE_PATTERN.test(number)
  }

  /**
   * Check for postal code validity.
   *
   * @param {string} postalCode Postal code to validate
   * @returns {boolean} Validity is ok or not
   */
  static isPostalCode(postalCode: unknown): boolean {
    if (!postalCode || typeof postalCode !== 'string') {
      return true // Empty is considered valid
    }

    return this.POSTAL_CODE_PATTERN.test(postalCode)
  }

  /**
   * Check for password validity.
   *
   * @param {string} password Password to validate
   * @param {number} minLength Minimum length (default: 8)
   * @returns {boolean} Validity is ok or not
   */
  static isPassword(password: unknown, minLength = 8): boolean {
    if (!password || typeof password !== 'string') {
      return false
    }

    if (password.length < minLength) {
      return false
    }

    // At least one letter and one number
    return /\d/.test(password) && /[a-zA-Z]/.test(password)
  }

  /**
   * Check for username validity.
   *
   * @param {string} username Username to validate
   * @returns {boolean} Validity is ok or not
   */
  static isUsername(username: unknown): boolean {
    if (!username || typeof username !== 'string') {
      return false
    }

    return this.USERNAME_PATTERN.test(username)
  }

  /**
   * Check for an integer validity.
   *
   * @param {number|string} value Integer to validate
   * @returns {boolean} Validity is ok or not
   */
  static isInt(value: unknown): boolean {
    if (value === null || value === undefined || value === '') {
      return false
    }

    const parsedInt = parseInt(String(value), 10)
    return !isNaN(parsedInt) && parsedInt.toString() === String(value)
  }

  /**
   * Check for an integer validity (unsigned).
   *
   * @param {number|string} value Integer to validate
   * @returns {boolean} Validity is ok or not
   */
  static isUnsignedInt(value: unknown): boolean {
    return this.isInt(value) && parseInt(String(value), 10) >= 0
  }

  /**
   * Check for a number (int) bigger than 0
   *
   * @param {number|string} value Integer with value bigger than 0 to validate
   * @returns {boolean} Validity is ok or not
   */
  static isPositiveInt(value: unknown): boolean {
    return this.isInt(value) && parseInt(String(value), 10) > 0
  }

  /**
   * Check for boolean validity.
   *
   * @param {unknown} bool Value to validate
   * @returns {boolean} Validity is ok or not
   */
  static isBool(bool: unknown): boolean {
    return (
      bool === null ||
      typeof bool === 'boolean' ||
      bool === 0 ||
      bool === 1 ||
      bool === '0' ||
      bool === '1'
    )
  }

  /**
   * Check for a date format.
   *
   * @param {string} date Date to validate (YYYY-MM-DD)
   * @returns {boolean} Validity is ok or not
   */
  static isDateFormat(date: unknown): boolean {
    if (!date || typeof date !== 'string') {
      return false
    }

    return /^([0-9]{4})-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[01]))( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/.test(
      date,
    )
  }

  /**
   * Check for date validity.
   *
   * @param {string} date Date to validate (YYYY-MM-DD)
   * @returns {boolean} Validity is ok or not
   */
  static isDate(date: unknown): boolean {
    if (!date || typeof date !== 'string' || !this.isDateFormat(date)) {
      return false
    }

    const parts = date.split('-')
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const day = parseInt(parts[2], 10)

    // Check if the date is valid
    const d = new Date(year, month - 1, day)
    return (
      d.getFullYear() === year &&
      d.getMonth() === month - 1 &&
      d.getDate() === day
    )
  }

  /**
   * Check for date or null validity.
   *
   * @param {string|null} date Date to validate
   * @returns {boolean} Validity is ok or not
   */
  static isDateOrNull(date: unknown): boolean {
    return (
      date === null ||
      date === '' ||
      date === '0000-00-00 00:00:00' ||
      date === '0000-00-00' ||
      this.isDate(date)
    )
  }

  /**
   * Check if string is empty.
   *
   * @param {unknown} str String to validate
   * @returns {boolean} True if empty
   */
  static isEmpty(str: unknown): boolean {
    return str === undefined || str === null || str === ''
  }

  /**
   * Check if string has minimum length.
   *
   * @param {string} str String to validate
   * @param {number} minLength Minimum length
   * @returns {boolean} Validity is ok or not
   */
  static hasMinLength(str: unknown, minLength: number): boolean {
    if (this.isEmpty(str) || typeof str !== 'string') {
      return false
    }

    return str.length >= minLength
  }

  /**
   * Check if string has maximum length.
   *
   * @param {string} str String to validate
   * @param {number} maxLength Maximum length
   * @returns {boolean} Validity is ok or not
   */
  static hasMaxLength(str: unknown, maxLength: number): boolean {
    if (this.isEmpty(str)) {
      return true
    }

    if (typeof str !== 'string') {
      return false
    }

    return str.length <= maxLength
  }

  /**
   * Check if string has exact length.
   *
   * @param {string} str String to validate
   * @param {number} exactLength Exact length
   * @returns {boolean} Validity is ok or not
   */
  static hasExactLength(str: unknown, exactLength: number): boolean {
    if (this.isEmpty(str) || typeof str !== 'string') {
      return false
    }

    return str.length === exactLength
  }

  /**
   * Check if array is empty.
   *
   * @param {unknown} arr Array to validate
   * @returns {boolean} True if empty
   */
  static isEmptyArray(arr: unknown): boolean {
    return !Array.isArray(arr) || arr.length === 0
  }

  /**
   * Check if object is empty.
   *
   * @param {unknown} obj Object to validate
   * @returns {boolean} True if empty
   */
  static isEmptyObject(obj: unknown): boolean {
    return (
      obj === null ||
      typeof obj !== 'object' ||
      Object.keys(obj || {}).length === 0
    )
  }

  /**
   * Check if value matches a regex pattern.
   *
   * @param {string} value Value to validate
   * @param {RegExp} pattern Pattern to match
   * @returns {boolean} Validity is ok or not
   */
  static matchesPattern(value: unknown, pattern: RegExp): boolean {
    if (this.isEmpty(value) || typeof value !== 'string') {
      return false
    }

    return pattern.test(value)
  }

  /**
   * Check if value is a valid JSON string.
   *
   * @param {string} value Value to validate
   * @returns {boolean} Validity is ok or not
   */
  static isJson(value: unknown): boolean {
    if (this.isEmpty(value) || typeof value !== 'string') {
      return false
    }

    try {
      JSON.parse(value)
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * Check if value is a valid hex color.
   *
   * @param {string} value Color to validate
   * @returns {boolean} Validity is ok or not
   */
  static isHexColor(value: unknown): boolean {
    if (this.isEmpty(value) || typeof value !== 'string') {
      return false
    }

    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
  }

  /**
   * Check if value is a valid credit card number.
   *
   * @param {string} value Card number to validate
   * @returns {boolean} Validity is ok or not
   */
  static isCreditCard(value: unknown): boolean {
    if (this.isEmpty(value) || typeof value !== 'string') {
      return false
    }

    // Remove all non-digits
    const cardNumber = value.replace(/\D/g, '')

    // Check if length is valid (13-19 digits)
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return false
    }

    // Luhn algorithm
    let sum = 0
    let shouldDouble = false

    // Loop through values starting from the rightmost side
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10)

      if (shouldDouble) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }

      sum += digit
      shouldDouble = !shouldDouble
    }

    return sum % 10 === 0
  }

  /**
   * Validate input based on rules and return errors if any.
   *
   * @param {Record<string, any>} data Data to validate
   * @param {ValidationRules} rules Validation rules
   * @returns {ValidationErrors} Validation errors, empty if valid
   */
  static validate(
    data: Record<string, any>,
    rules: ValidationRules,
  ): ValidationErrors {
    const errors: ValidationErrors = {}

    for (const field in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, field)) {
        const fieldRules = rules[field]
        const value = data[field]

        // Check required rule first
        if (fieldRules.required && this.isEmpty(value)) {
          errors[field] =
            fieldRules.message || (this.DEFAULT_MESSAGES.required as string)
          continue // Skip other validations if required fails
        }

        // Skip other validations if value is empty and not required
        if (this.isEmpty(value) && !fieldRules.required) {
          continue
        }

        // Validate based on type
        if (fieldRules.type) {
          switch (fieldRules.type) {
            case 'email':
              if (!this.isEmail(value)) {
                errors[field] =
                  fieldRules.message || (this.DEFAULT_MESSAGES.email as string)
              }
              break

            case 'url':
              if (!this.isUrl(value)) {
                errors[field] =
                  fieldRules.message || (this.DEFAULT_MESSAGES.url as string)
              }
              break

            case 'phoneNumber':
              if (!this.isPhoneNumber(value)) {
                errors[field] =
                  fieldRules.message ||
                  (this.DEFAULT_MESSAGES.phoneNumber as string)
              }
              break

            case 'postalCode':
              if (!this.isPostalCode(value)) {
                errors[field] =
                  fieldRules.message ||
                  (this.DEFAULT_MESSAGES.postalCode as string)
              }
              break

            case 'password':
              if (!this.isPassword(value, fieldRules.minLength || 8)) {
                errors[field] =
                  fieldRules.message ||
                  (this.DEFAULT_MESSAGES.password as string)
              }
              break

            case 'username':
              if (!this.isUsername(value)) {
                errors[field] =
                  fieldRules.message ||
                  (this.DEFAULT_MESSAGES.username as string)
              }
              break

            case 'numeric':
              if (!this.isFloat(value)) {
                errors[field] =
                  fieldRules.message ||
                  (this.DEFAULT_MESSAGES.numeric as string)
              }
              break

            case 'integer':
              if (!this.isInt(value)) {
                errors[field] =
                  fieldRules.message ||
                  (this.DEFAULT_MESSAGES.integer as string)
              }
              break

            case 'positiveInteger':
              if (!this.isPositiveInt(value)) {
                errors[field] =
                  fieldRules.message ||
                  (this.DEFAULT_MESSAGES.positiveInteger as string)
              }
              break

            case 'price':
              if (!this.isPrice(value)) {
                errors[field] =
                  fieldRules.message || (this.DEFAULT_MESSAGES.price as string)
              }
              break

            case 'date':
              if (!this.isDate(value)) {
                errors[field] =
                  fieldRules.message || (this.DEFAULT_MESSAGES.date as string)
              }
              break

            default:
              break
          }
        }

        // Check min length
        if (
          fieldRules.minLength &&
          !this.hasMinLength(value, fieldRules.minLength)
        ) {
          const minLengthMessage = this.DEFAULT_MESSAGES.minLength as (
            min: number,
          ) => string
          errors[field] =
            fieldRules.message || minLengthMessage(fieldRules.minLength)
        }

        // Check max length
        if (
          fieldRules.maxLength &&
          !this.hasMaxLength(value, fieldRules.maxLength)
        ) {
          const maxLengthMessage = this.DEFAULT_MESSAGES.maxLength as (
            max: number,
          ) => string
          errors[field] =
            fieldRules.message || maxLengthMessage(fieldRules.maxLength)
        }

        // Check exact length
        if (
          fieldRules.exactLength &&
          !this.hasExactLength(value, fieldRules.exactLength)
        ) {
          const exactLengthMessage = this.DEFAULT_MESSAGES.exact as (
            exact: number,
          ) => string
          errors[field] =
            fieldRules.message || exactLengthMessage(fieldRules.exactLength)
        }

        // Check pattern match
        if (
          fieldRules.pattern &&
          !this.matchesPattern(value, fieldRules.pattern)
        ) {
          errors[field] =
            fieldRules.message || (this.DEFAULT_MESSAGES.pattern as string)
        }

        // Custom validation function
        if (fieldRules.validate && typeof fieldRules.validate === 'function') {
          const customResult = fieldRules.validate(value, data)
          if (customResult !== true) {
            errors[field] =
              typeof customResult === 'string'
                ? customResult
                : fieldRules.message ||
                  (this.DEFAULT_MESSAGES.invalid as string)
          }
        }
      }
    }

    return errors
  }
}

export default Validate
