import React from 'react'
import { View } from 'react-native'
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
  ValidationRule,
  Validate,
} from 'react-hook-form'
import tw from 'twrnc'
import TextInput from './TextInput'
import PasswordInput from './PasswordInput'
import InputWrapper from './InputWrapper'
import { IoniconsName } from '../../../share/types/icons.types'

type InputType = 'text' | 'email' | 'password' | 'phone' | 'number'

interface InputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  rules?: {
    required?: boolean | string
    minLength?: ValidationRule<number>
    maxLength?: ValidationRule<number>
    pattern?: ValidationRule<RegExp>
    validate?:
      | Validate<FieldValues, T>
      | Record<string, Validate<FieldValues, T>>
  }
  type?: InputType
  multiline?: boolean
  numberOfLines?: number
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  iconLeft?: IoniconsName
  iconRight?: IoniconsName
  onPressIconRight?: () => void
  onPressIconLeft?: () => void
  maxLength?: number
  containerStyle?: string
  returnKeyType?: 'done' | 'next' | 'search' | 'send'
  onSubmitEditing?: () => void
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  error?: FieldError
  hint?: string
}

const Input = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
  type = 'text',
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  iconLeft,
  containerStyle,
  returnKeyType,
  onSubmitEditing,
  autoCapitalize = 'none',
  hint,
}: InputProps<T>) => {
  const renderInput = (field: any) => {
    const { onChange, value, fieldState } = field
    if (type === 'password') {
      return (
        <InputWrapper
          label={label}
          required={!!rules?.required}
          hint={hint}
          error={fieldState.error?.message}
        >
          <PasswordInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            containerStyle={containerStyle}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
          />
        </InputWrapper>
      )
    }

    return (
      <InputWrapper
        label={label}
        required={!!rules?.required}
        hint={hint}
        error={fieldState.error?.message}
      >
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          iconLeft={iconLeft}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize={autoCapitalize}
        />
      </InputWrapper>
    )
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState, formState }) => {
        return <View style={tw`w-full`}>
          {renderInput({
            ...field,
            value: field.value || '',
            fieldState,
            error: formState.errors?.[name],
          })}
        </View>
      }}
    />
  )
}

export default Input
