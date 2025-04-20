import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import OnboardingScreen from '../screens/OnboardingScreen'

export type AuthStackParamList = {
  OnboardingScreen: undefined
}
const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
