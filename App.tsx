import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import { useState } from 'react';


export default function App() {

  const appName = 'my awesome app';
  const [inputText, setInputText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleInputData(text: string) {
    setInputText(text);
    setIsModalVisible(false);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Header appName={appName} />
      <StatusBar style="auto" />
      <Button 
        title="Add a goal"
        onPress={() => setIsModalVisible(true)}
      />
      <Input 
        autoFocus={true} 
        onInput={handleInputData}
        onCancel={handleCancel}
        visible={isModalVisible}
      />
      <Text>My goal: {inputText}</Text>
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
