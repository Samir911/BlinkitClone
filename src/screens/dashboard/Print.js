import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Styles from '../../style/Styles'

const Print = () => {
  return (
    <SafeAreaView style={Styles.safe_area_view}>
      <Text>Print</Text>
    </SafeAreaView>
  )
}

export default Print