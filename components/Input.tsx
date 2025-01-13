import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function Input() {

    const [name, setName] = useState('');
    
  return (
    <View>
      <TextInput
        placeholder="Enter your name"
        onChangeText={(changedName: string) => setName(changedName)}
      />
    </View>
  )
}

const styles = StyleSheet.create({})