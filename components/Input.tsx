import { Button, StyleSheet, Text, TextInput, View, Modal } from 'react-native'
import React, { useState } from 'react'

interface InputProps {
  autoFocus?: boolean;
  InputHandler: (text: string) => void;
  visible: boolean;
}
  
export default function Input({ autoFocus, InputHandler, visible }: InputProps) {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(true);

  const handleTextChange = (text: string) => {
    setText(text);
    setCharCount(text.length);
  };
  
  const handleConfirm = () => {
    InputHandler(text);
    setCharCount(0);
  };
  
  return (
    <Modal 
      visible={visible}
      animationType="slide"
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Please type something"
          onChangeText={handleTextChange}
          autoFocus={autoFocus} 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {isFocused && charCount > 0 && <Text>Character Count: {charCount}</Text>}

        {!isFocused && (
          <Text>
            {text.length >=  3
            ? "Thank you"
            :"Please type more than 3 characters"}
          </Text>
        )}
        <Button 
          title="Confirm" 
          onPress={handleConfirm}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});