import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import { useState } from 'react';

export default function App() {

  const appName = 'my awesome app';
  const [inputText, setInputText] = useState('');

  function handleInputData(text: string) {
    setInputText(text);
  }

  return (
    <View style={styles.container}>
      <Header appName={appName} />
      <StatusBar style="auto" />
      <Input autoFocus={true} InputHandler={handleInputData} />
      <Text>Received text: {inputText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
