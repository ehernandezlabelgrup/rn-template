import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from '@react-native-vector-icons/ionicons'
import tw from '../../../lib/tailwind'
import Label from './Label'
import Hint from './Hint'

type RadioVariant = 'filled' | 'outline'

interface RadioProps {
  /** Valor a representar */
  value: string
  /** Valor seleccionado actualmente */
  selectedValue?: string
  /** Función que se ejecuta al cambiar el valor */
  onValueChange?: (value: string) => void
  /** Texto a mostrar junto al radio button */
  label?: string
  /** Texto de descripción o ayuda */
  hint?: string
  /** Mensaje de error cuando hay un problema con la validación */
  error?: string
  /** Indica si el campo es requerido */
  required?: boolean
  /** Variante de estilo */
  variant?: RadioVariant
  /** Deshabilita la interacción */
  disabled?: boolean
}

/**
 * Componente RadioButton personalizable para React Native
 * Utiliza React Native Vector Icons (Ionicons) y TailwindCSS
 */
export default function RadioButton({
  value,
  selectedValue,
  onValueChange,
  label,
  hint,
  error,
  required = false,
  variant = 'filled',
  disabled = false,
}: RadioProps) {
  // Determina si este radio button está seleccionado
  const isSelected = value === selectedValue

  // Estilos según variante y estado
  const getRadioStyles = () => {
    const baseStyle = tw`justify-center items-center rounded-full border`
    const radioSize = tw`w-6 h-6`
    const disabledStyle = disabled ? tw`opacity-50` : {}

    // Si hay error, usar borde rojo
    if (error) {
      return [baseStyle, radioSize, tw`border-red-500 border-2`, disabledStyle]
    }

    // Estilos según variante
    if (variant === 'outline') {
      return [
        baseStyle,
        radioSize,
        isSelected ? tw`border-primary border-2` : tw`border-gray-300 border`,
        disabledStyle,
      ]
    } else {
      // Variante filled por defecto
      return [
        baseStyle,
        radioSize,
        isSelected
          ? tw`bg-primary border-primary`
          : tw`bg-white border-gray-300`,
        disabledStyle,
      ]
    }
  }

  // Maneja el cambio de selección
  const handleSelect = () => {
    if (disabled) return

    if (onValueChange) {
      onValueChange(value)
    }
  }

  return (
    <TouchableOpacity
      style={tw`flex-col gap-1`}
      onPress={handleSelect}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}>
      <View style={[tw`flex-row items-start justify-start gap-1`]}>
        <View style={getRadioStyles()}>
          {isSelected &&
            (variant === 'outline' ? (
              <View style={tw`w-3 h-3 rounded-full bg-primary`} />
            ) : (
              <Icon name="ellipse" size={14} color="#ffffff" />
            ))}
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
