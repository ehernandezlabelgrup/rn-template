import React, {useMemo} from 'react'
import {View, Text} from 'react-native'
import tw from '../../../lib/tailwind'
import Icon from '@react-native-vector-icons/ionicons'
import Label from './Label'
import Hint from './Hint'

interface InputWrapperProps {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  containerStyle?: string
  children: React.ReactNode
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  label,
  error,
  hint,
  required = false,
  children,
}) => {
  const containerBaeClasses =
    'h-12 bg-gray-100 w-full border border-gray-100 rounded-lg'
  const containerErrorClasses = 'border-error'

  const errorClasses = 'text-error rounded-lg text-xs mt-1 ml-1 font-regular'

  const containerClasses = useMemo(() => {
    let classes = `${containerBaeClasses}`
    if (error) {
      classes += ` ${containerErrorClasses}`
    }

    return classes
  }, [error, containerBaeClasses, containerErrorClasses])


  return (
    <View style={[tw`gap-1 flex flex-col`]}>
      {label && (
        <Label
          label={label}
          required={required}
          error={!!error}
        />
      )}
      {hint && <Hint hint={hint} />}
      <View style={tw`${containerClasses}`}>{children}</View>
      {error && (
        <View style={[tw`flex flex-row items-center`]}>
          <Icon
            name="information-circle"
            size={16}
            color={tw.color('error')}
            style={[tw`mt-1`]}
          />
          <Text style={tw`${errorClasses}`}>{error}</Text>
        </View>
      )}
    </View>
  )
}

export default InputWrapper
