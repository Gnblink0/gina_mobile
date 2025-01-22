import { Button, StyleSheet, Text, TextInput, View, Modal, Alert } from 'react-native'
import React, { useState } from 'react'

interface InputProps {
  autoFocus?: boolean;
  onInput: (text: string) => void;
  onCancel: () => void;
  visible: boolean;
}
  
export default function Input({ autoFocus, onInput, onCancel, visible }: InputProps) {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(true);

  const handleTextChange = (text: string) => {
    setText(text);
    setCharCount(text.length);
  };
  
  const handleConfirm = () => {
    onInput(text);
    setCharCount(0);
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel',
      'Are you sure you want to cancel?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'OK', onPress: () => onCancel() },
      ]
    );
  };
  
  return (
    <Modal 
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Please type something"
            onChangeText={handleTextChange}
            autoFocus={autoFocus} 
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          {isFocused && charCount > 0 && (
            <Text style={styles.countText}>
              Character Count: {charCount}
            </Text>
          )}

          {!isFocused && (
            <Text style={styles.messageText}>
              {text.length >= 3
                ? "Thank you"
                : "Please type more than 3 characters"}
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <Button 
              title="Confirm" 
              onPress={handleConfirm}
            />
            <Button 
              title="Cancel" 
              onPress={handleCancel}
              color="red"
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',  
    borderRadius: 10,            
    padding: 30,                 
    width: '80%',               
    alignItems: 'center',       
  },
  input: {
    width: '100%',
    marginBottom: 15,
    fontSize: 16,
  },
  countText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    width: '40%',  // 每个按钮占40%宽度
  },
});