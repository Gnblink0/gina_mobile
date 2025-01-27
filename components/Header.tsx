import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface HeaderProps {
    appName: string;
}

export default function Header({ appName }: HeaderProps) {
  return (
    <View>
      <Text style={styles.headerText}>Welcome to {appName}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
    }
})