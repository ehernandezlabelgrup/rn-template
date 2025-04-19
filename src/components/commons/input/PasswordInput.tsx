import React, {useState} from 'react'
import {
  TextInput as RNTextInput,
  TouchableOpacity,
  ReturnKeyTypeOptions,
} from 'react-native'
import Icon from '@react-native-vector-icons/ionicons'
import tw from 'twrnc'

interface PasswordInputProps {
  label?: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  error?: string
  containerStyle?: string
  returnKeyType?: ReturnKeyTypeOptions
  onSubmitEditing?: () => void
  reference?: React.Ref<RNTextInput>
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = '',
  returnKeyType,
  onSubmitEditing,
  reference,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <>
      <Icon
        name="lock-closed"
        size={20}
        color={tw.color('gray-500')}
        style={tw`absolute left-3 top-3`}
      />

      <RNTextInput
        ref={reference}
        style={tw`flex-1 h-12 w-full font-regular pl-10 pr-12 text-gray-500`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tw.color('gray-500')}
        secureTextEntry={!isPasswordVisible}
        autoCapitalize="none"
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
      />

      <TouchableOpacity
        style={tw`absolute right-0 top-0 items-center justify-center w-10 h-full`}
        onPress={togglePasswordVisibility}>
        <Icon
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={20}
          color={tw.color('gray')}
        />
      </TouchableOpacity>
    </>
  )
}

export default PasswordInput
