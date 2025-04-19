import React from 'react'
import {
  TextInput as RNTextInput,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  View,
} from 'react-native'
import Icon from '@react-native-vector-icons/ionicons'
import tw from 'twrnc'
import {IoniconsName} from '../../../share/types/icons.types'

interface TextInputProps {
  label?: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  error?: string
  containerStyle?: string
  returnKeyType?: ReturnKeyTypeOptions
  onSubmitEditing?: () => void
  reference?: React.Ref<RNTextInput>
  iconLeft?: IoniconsName
  keyboardType?: KeyboardTypeOptions
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  multiline?: boolean
  numberOfLines?: number
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  reference,
  iconLeft,
  onSubmitEditing,
  returnKeyType,
  autoCapitalize = 'none',
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
}) => {
  return (
    <View style={tw`w-full relative`}>
      {iconLeft && (
        <Icon
          name={iconLeft}
          size={20}
          color={tw.color('gray-500')}
          style={tw`absolute left-3 top-3`}
        />
      )}

      <RNTextInput
        ref={reference}
        style={tw.style(
          'flex-1 h-12 w-full font-regular text-gray-500',
          iconLeft ? 'pl-10' : 'pl-3'
        )}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tw.color('gray-500')}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  )
}

export default TextInput
