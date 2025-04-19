import React from 'react'
import {useForm} from 'react-hook-form'
import Input from '../components/commons/input'
import Container from '../components/commons/Container'
import {Button} from 'react-native'

export default function SplashScreen() {
  const {control, handleSubmit} = useForm()
    return (
    <Container>
      <Input
        hint="This is a description"
        control={control}
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
          maxLength: {
            value: 20,
            message: 'Password must be at most 20 characters',
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message:
              'Password must contain at least one uppercase letter, one lowercase letter, and one number',
          },
        }}
      />
      <Input
        hint="This is a description"
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email address',
          },
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="done"
        onSubmitEditing={() => console.log('Email submitted')}
        iconLeft="mail"
        iconRight="checkmark-circle-outline"
      />
      <Button
        title="Submit"
        onPress={handleSubmit(data => console.log(data))}
      />
    </Container>
  )
}
