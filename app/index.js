import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const index = () => {
  return (
    <View>
      <Redirect href="/(tabs)/PhoneBook"/>
      {/* <Redirect href="/(authenticate)/home"/> */}
    </View>
  )
}

export default index

const styles = StyleSheet.create({})