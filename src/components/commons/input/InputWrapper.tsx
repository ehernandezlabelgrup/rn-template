import React, {useMemo} from 'react'
import {View, Text} from 'react-native'
import tw from '../../../lib/tailwind'
import Icon from '@react-native-vector-icons/ionicons'

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
  const labelBaseClasses = 'font-semiBold text-label'
  const labelClassesError = 'text-error'
  const errorClasses = 'text-error rounded-lg text-xs mt-1 ml-1 font-regular'
  const hintClasses = 'text-hint text-xs mt-1 ml-1 font-italic'

  const containerClasses = useMemo(() => {
    let classes = `${containerBaeClasses}`
    if (error) {
      classes += ` ${containerErrorClasses}`
    }

    return classes
  }, [error, containerBaeClasses, containerErrorClasses])
  const labelClasses = useMemo(() => {
    let classes = `${labelBaseClasses}`
    if (error) {
      classes += ` ${labelClassesError}`
    }

    return classes
  }, [error, labelBaseClasses, labelClassesError])

  return (
    <View style={[tw`gap-1 flex flex-col`]}>
      {label && (
        <View style={tw`flex-row items-center`}>
          <Text style={tw`${labelClasses}`}>{label}</Text>
          {required && <Text style={tw`text-red-500 ml-1`}>*</Text>}
        </View>
      )}{' '}
      {hint && <Text style={tw`${hintClasses}`}>{hint}</Text>}
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
