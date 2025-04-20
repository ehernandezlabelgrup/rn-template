import {Text} from 'react-native'
import React from 'react'
import tw from '../../../lib/tailwind'

const hintClasses = 'text-hint text-xs mt-1 ml-1 font-italic'

interface IProps {
  hint?: string
}

export default function Hint({hint}: IProps) {
  return <Text style={tw`${hintClasses}`}>{hint}</Text>
}
