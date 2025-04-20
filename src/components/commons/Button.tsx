import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native'
import React from 'react'
import Icon from '@react-native-vector-icons/ionicons'
import tw from '../../lib/tailwind'
import {IoniconsName} from '../../share/types/icons.types'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'error'
  | 'success'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface IProps {
  /** Texto a mostrar en el botón */
  label?: string
  /** Función que se ejecuta al presionar el botón */
  onPress?: () => void
  /** Variante de estilo del botón */
  variant?: ButtonVariant
  /** Tamaño del botón */
  size?: ButtonSize
  /** Nombre del ícono (de Ionicons) para mostrar a la izquierda */
  leftIcon?: IoniconsName
  /** Nombre del ícono (de Ionicons) para mostrar a la derecha */
  rightIcon?: IoniconsName
  /** Muestra un spinner de carga, deshabilita el botón */
  loading?: boolean
  /** Deshabilita el botón */
  disabled?: boolean
  /** Hace que el botón ocupe todo el ancho disponible */
  fullWidth?: boolean
  /** Clases adicionales de Tailwind para el contenedor */
  className?: string
  /** Estilos adicionales para el botón */
  style?: any
  /** Color personalizado para el texto */
  textColor?: string
  /** Estilos adicionales para el texto */
  textStyle?: any
  /** Tamaño personalizado para el ícono */
  iconSize?: number
  /** Color personalizado para el ícono */
  iconColor?: string
  /** Elemento hijo personalizado en lugar de text+iconos */
  children?: React.ReactNode
}

/**
 * Componente Button personalizable para React Native
 * @example
 * <Button
 *   label="Guardar"
 *   variant="primary"
 *   size="md"
 *   leftIcon="save"
 *   onPress={() => console.log('Guardado')}
 * />
 */
const Button: React.FC<IProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  style,
  textColor,
  textStyle,
  iconSize,
  iconColor,
  children,
}) => {
  const isDisabled = disabled || loading

  // Mapeo de variantes a estilos
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return isDisabled
          ? 'bg-gray-300 border-gray-300'
          : 'bg-primary border-primary active:bg-primary/80'
      case 'secondary':
        return isDisabled
          ? 'bg-gray-200 border-gray-200'
          : 'bg-primaryLight border-primaryLight active:bg-primaryLight/80'
      case 'outline':
        return isDisabled
          ? 'bg-transparent border-gray-300'
          : 'bg-transparent border-primary active:bg-primary/10'
      case 'ghost':
        return isDisabled
          ? 'bg-transparent border-transparent'
          : 'bg-transparent border-transparent active:bg-gray-100'
      case 'error':
        return isDisabled
          ? 'bg-gray-300 border-gray-300'
          : 'bg-error border-error active:bg-error/80'
      case 'success':
        return isDisabled
          ? 'bg-gray-300 border-gray-300'
          : 'bg-success border-success active:bg-success/80'
      default:
        return 'bg-primary border-primary active:bg-primary/80'
    }
  }

  // Mapeo de tamaños a estilos
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1 min-h-8'
      case 'md':
        return 'px-4 py-2 min-h-10'
      case 'lg':
        return 'px-6 py-3 min-h-12'
      default:
        return 'px-4 py-2 min-h-10'
    }
  }

  // Devuelve el tamaño del texto según el tamaño del botón
  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs'
      case 'md':
        return 'text-sm'
      case 'lg':
        return 'text-base'
      default:
        return 'text-sm'
    }
  }

  // Devuelve el tamaño del ícono según el tamaño del botón
  const getIconSize = () => {
    if (iconSize) return iconSize
    switch (size) {
      case 'sm':
        return 16
      case 'md':
        return 18
      case 'lg':
        return 20
      default:
        return 18
    }
  }

  // Devuelve el color del texto según la variante
  const getTextColor = () => {
    if (textColor) return textColor
    if (isDisabled) return tw.color('gray-500')

    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'error':
      case 'success':
        return '#FFFFFF'
      case 'outline':
        return tw.color('primary')
      case 'ghost':
        return tw.color('primary')
      default:
        return '#FFFFFF'
    }
  }

  // Devuelve el color del ícono según la variante
  const getIconColor = () => {
    if (iconColor) return iconColor
    return getTextColor()
  }

  // Estilo del contenedor principal
  const containerStyles = tw.style(
    'flex-row items-center justify-center border rounded-lg',
    getVariantStyles(),
    getSizeStyles(),
    fullWidth ? 'w-full' : 'self-start',
    className,
  )

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[containerStyles, style]}>
      <View style={tw`flex-row items-center justify-center`}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={getTextColor()}
            style={tw`mx-2`}
          />
        ) : (
          <>
            {leftIcon && (
              <Icon
                name={leftIcon}
                size={getIconSize()}
                color={getIconColor()}
                style={tw`mr-2`}
              />
            )}

            {children || (
              <Text
                style={[
                  tw`font-medium ${getTextSize()}`,
                  {color: getTextColor()},
                  textStyle,
                ]}>
                {label}
              </Text>
            )}

            {rightIcon && (
              <Icon
                name={rightIcon}
                size={getIconSize()}
                color={getIconColor()}
                style={tw`ml-2`}
              />
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default Button
