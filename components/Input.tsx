import { Button, StyleSheet, Text, TextInput, View, Modal, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import ImageManager from './ImageManager'
interface InputProps {
  autoFocus?: boolean;
  onInput: (text: string, imageUri: string) => void;
  onCancel: () => void;
  visible: boolean;
}
  
const MIN_CHARS_REQUIRED = 3;

export default function Input({ autoFocus, onInput, onCancel, visible }: InputProps) {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(true);
  const [takenImageUri, setTakenImageUri] = useState("");

  const handleTextChange = (text: string) => {
    setText(text);
    setCharCount(text.length);
  };
  
  const handleConfirm = () => { 
    onInput(text, takenImageUri);
    setText('');
    setCharCount(0);
    setTakenImageUri('');
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel',
      'Are you sure you want to cancel?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'OK', onPress: () => {
          onCancel();
          setText('');
          setCharCount(0);
        } },
      ]
    );
  };

  const handleImageUri = (uri: string) => {
    setTakenImageUri(uri);
  };

  return (
    <Modal 
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.container}>
        <View style=  {styles.inputContainer}>
          <Image
            source={require('../assets/target-logo.png')}
            style={styles.image}
            accessibilityLabel="A target icon from local"
          />
          <Image 
            source={{ 
              uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' 
            }}
            style={styles.image}
            accessibilityLabel="A target icon from network"
          />
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
              {text.length >= MIN_CHARS_REQUIRED
                ? "Thank you"
                : "Please type more than 3 characters"}
            </Text>
          )}
          <ImageManager imageUriHandler={handleImageUri} imageUri={takenImageUri}/>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button 
                title="Confirm" 
                onPress={handleConfirm}
                disabled={text.length < MIN_CHARS_REQUIRED}
              />
            </View>
            <View style={styles.button}>
              <Button 
                title="Cancel" 
                onPress={handleCancel}
                color="red"
              />
            </View>
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
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    width: '45%',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});