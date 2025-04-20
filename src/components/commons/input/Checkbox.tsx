import {View, Text, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import Icon from '@react-native-vector-icons/ionicons'
import tw from '../../../lib/tailwind'
import Label from './Label'
import Hint from './Hint'

type CheckboxVariant = 'filled' | 'outline'

interface CheckboxProps {
  /** Valor inicial del checkbox */
  initialValue?: boolean
  /** Función que se ejecuta al cambiar el valor */
  onValueChange?: (value: boolean) => void
  /** Texto a mostrar junto al checkbox */
  label?: string
  /** Texto de descripción o ayuda */
  hint?: string
  /** Mensaje de error cuando hay un problema con la validación */
  error?: string
  /** Indica si el campo es requerido */
  required?: boolean
  /** Variante de estilo */
  variant?: CheckboxVariant
  /** Deshabilita la interacción */
  disabled?: boolean
}

/**
 * Componente Checkbox personalizable para React Native
 * Utiliza React Native Vector Icons (Ionicons) y TailwindCSS
 */
export default function Checkbox({
  initialValue = false,
  onValueChange,
  label,
  hint,
  error,
  required = false,
  variant = 'filled',
  disabled = false,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(initialValue)

  // Tamaño fijo para el checkbox
  const boxStyles = tw`w-5 h-5`
  const iconSize = 16

  // Estilos según variante y estado
  const getBoxStyles = () => {
    const baseStyle = tw`justify-center items-center rounded border`
    const disabledStyle = disabled ? tw`opacity-50` : {}

    // Si hay error, usar borde rojo
    if (error) {
      return [baseStyle, boxStyles, tw`border-red-500 border-2`, disabledStyle]
    }

    // Estilos según variante
    if (variant === 'outline') {
      return [
        baseStyle,
        boxStyles,
        isChecked ? tw`border-primary border-2` : tw`border-gray-300 border`,
        disabledStyle,
      ]
    } else {
      // Variante filled por defecto
      return [
        baseStyle,
        boxStyles,
        isChecked
          ? tw`bg-primary border-primary`
          : tw`bg-white border-gray-300`,
        disabledStyle,
      ]
    }
  }

  const toggleCheckbox = () => {
    if (disabled) return

    const newValue = !isChecked
    setIsChecked(newValue)

    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <TouchableOpacity
      style={tw`flex-col gap-1`}
      onPress={toggleCheckbox}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}>
      <View style={[tw`flex-row items-start justify-start gap-1`]}>
        <View style={getBoxStyles()}>
          {isChecked && (
            <Icon
              name="checkmark-sharp"
              size={iconSize}
              color={variant === 'outline' ? '#3b82f6' : '#ffffff'}
            />
          )}
        </View>

        {label && <Label label={label} required={required} error={!!error} />}
      </View>

      {hint && <Hint hint={hint} />}

      {error && (
        <Text style={[tw`text-xs ml-9 mt-1 text-red-500`]}>{error}</Text>
      )}
    </TouchableOpacity>
  )
}
