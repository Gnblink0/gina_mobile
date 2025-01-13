import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import { useState } from 'react';
export default function App() {

  const appName = 'my awesome app';
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Header appName={appName} />
      <StatusBar style="auto" />
      <TextInput
        placeholder="Enter your name"
        onChangeText={(changedName: string) => setName(changedName)}
      />
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
