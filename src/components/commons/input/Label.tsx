import {View, Text} from 'react-native'
import React, {useMemo} from 'react'
import tw from '../../../lib/tailwind'

interface IProps {
  label: string
  required?: boolean
  error?: boolean
}

const Label = ({
  label = '',
  required = false,
  error = false,
}: IProps) => {
  const labelBaseClasses = 'font-semiBold text-label'
  const labelClassesError = 'text-error'

  const labelClasses = useMemo(() => {
    let classes = `${labelBaseClasses}`
    if (error) {
      classes += ` ${labelClassesError}`
    }

    return classes
  }, [error, labelBaseClasses, labelClassesError])
  return (
    <View style={tw`flex-row items-center`}>
      <Text style={tw`${labelClasses}`}>{label}</Text>
      {required && <Text style={tw`text-red-500 ml-1`}>*</Text>}
    </View>
  )
}

export default Label
