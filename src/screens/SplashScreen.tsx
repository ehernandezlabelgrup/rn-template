import React, {useEffect} from 'react'
import {View, Image, Animated, StatusBar, Text} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import tw from '../lib/tailwind'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import {RootStackParamList} from '../navigation'

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current
  const versionFadeAnim = React.useRef(new Animated.Value(0)).current

  const appVersion = DeviceInfo.getVersion()
  const buildNumber = DeviceInfo.getBuildNumber()

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(300),
      Animated.timing(versionFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('AuthStack')
      }, 100)
    })
  }, [fadeAnim, scaleAnim, versionFadeAnim, navigation])

  return (
    <View style={[tw`flex-1 justify-center items-center bg-bg`]}>
      <StatusBar hidden />

      <Animated.View
        style={[
          tw`flex-1 justify-center items-center`,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <Image
          source={require('../assets/images/logo.jpg')}
          style={tw`w-90 h-90`}
          resizeMode="contain"
        />

        <Animated.View
          style={{
            opacity: versionFadeAnim,
            transform: [
              {
                translateY: versionFadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          }}>
          <Text style={tw`text-sm text-gray-500 text-center mt-4`}>
            Versión {appVersion} ({buildNumber})
          </Text>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

export default SplashScreen
