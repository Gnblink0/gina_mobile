import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
export default function App() {

  const appName = 'my awesome app';

  return (
    <View style={styles.container}>
      <Header appName={appName} />
      <StatusBar style="auto" />
      <Input />
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
