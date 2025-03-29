import { View, Text } from 'react-native'
import React from 'react'
import Styles from '../../style/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'

const Categories = () => {
  return (
     <SafeAreaView style={Styles.safe_area_view}>
      <Text>Categories</Text>
    </SafeAreaView>
  )
}

export default Categories