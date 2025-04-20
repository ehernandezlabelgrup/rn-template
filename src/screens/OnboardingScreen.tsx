import React, {useState, useRef} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import tw from '../lib/tailwind'
import Button from '../components/commons/Button'
import type {AuthStackParamList} from '../navigation/auth'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {SLIDES} from '../config'
import Container from '../components/commons/Container'

const {width, height} = Dimensions.get('window')

type Props = NativeStackScreenProps<AuthStackParamList, 'OnboardingScreen'>

const OnboardingSlide = ({item}) => {
  return (
    <View style={[tw`flex-1 items-center justify-center px-10`, {width}]}>
      <View style={[tw`mb-10`, styles.image]} />
      <Text style={tw`text-2xl font-bold text-primary mb-2 text-center`}>
        {item.title}
      </Text>
      <Text style={tw`text-base text-gray-500 text-center`}>
        {item.description}
      </Text>
    </View>
  )
}

const OnboardingScreen = ({navigation}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef(null)

  const handleOnScroll = event => {
    const {contentOffset} = event.nativeEvent
    const slideIndex = Math.round(contentOffset.x / width)
    if (slideIndex !== currentIndex) {
      setCurrentIndex(slideIndex)
    }
  }

  const goToNextSlide = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      })
      setCurrentIndex(currentIndex + 1)
    } else {
      completeOnboarding()
    }
  }

  const skipOnboarding = () => {
    completeOnboarding()
  }

  const completeOnboarding = () => {
    // AsyncStorage.setItem('onboardingCompleted', 'true');
  }

  const renderPaginationDots = () => {
    return (
      <View style={tw`flex-row justify-center my-5`}>
        {SLIDES.map((_, index) => (
          <View
            key={index}
            style={[
              tw`h-2 rounded-full mx-1`,
              {
                width: currentIndex === index ? 20 : 8,
                backgroundColor:
                  currentIndex === index
                    ? tw.color('primary')
                    : tw.color('gray-300'),
              },
            ]}
          />
        ))}
      </View>
    )
  }

  return (
    <Container>
      <StatusBar hidden />

      <TouchableOpacity
        style={tw`absolute top-12 right-6 z-10`}
        onPress={skipOnboarding}>
        <Text style={tw`text-gray-500 text-base font-medium`}>Omitir</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={({item}) => <OnboardingSlide item={item} />}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        scrollEventThrottle={16}
      />

      <View style={tw`pb-12 px-8`}>
        {renderPaginationDots()}

        <Button
          label={currentIndex < SLIDES.length - 1 ? 'Continuar' : 'Comenzar'}
          variant="primary"
          size="lg"
          fullWidth
          onPress={goToNextSlide}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.7,
    height: height * 0.4,
  },
})

export default OnboardingScreen
