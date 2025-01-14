import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

interface InputProps {
  autoFocus?: boolean;
}
  
export default function Input({ autoFocus }: InputProps) {

  const [name, setName] = useState('');
    
  return (
    <View>
      <TextInput
        placeholder="Enter your name"
        onChangeText={(changedName: string) => setName(changedName)}
        autoFocus={autoFocus} 
      />
    </View>
  )
}

const styles = StyleSheet.create({})