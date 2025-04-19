import {View, SafeAreaView} from 'react-native'
import React from 'react'
import tw from '../../lib/tailwind'

interface IProps {
  safearea?: boolean
  children: React.ReactNode
  paddingHorizontal?: boolean
  paddingVertical?: boolean
}

const PADDING = 4

export default function Container({
  safearea = true,
  children,
  paddingHorizontal = true,
  paddingVertical = true,
}: IProps) {
  const V = safearea ? SafeAreaView : View

  return (
    <V
      style={[
        tw`flex-1 bg-bg
    ${paddingHorizontal ? `px-${PADDING}` : ''}
    ${paddingVertical ? `py-${PADDING}` : ''}
    `,
      ]}>
      {children}
    </V>
  )
}
