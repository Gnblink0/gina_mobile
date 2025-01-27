import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";
import { useState } from "react";

export default function App() {
  const appName = "my awesome app";
  const [inputText, setInputText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleInputData(text: string) {
    setInputText(text);
    setIsModalVisible(false);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <Header appName={appName} />
        <StatusBar style="auto" />
        <View style={styles.button}>
          <Button title="Add a goal" onPress={() => setIsModalVisible(true)} />
        </View>
        <Input
          autoFocus={true}
          onInput={handleInputData}
          onCancel={handleCancel}
          visible={isModalVisible}
        />
      </View>
      <View style={styles.buttonSection}>
        {inputText && <Text style={styles.goalText}>{inputText}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerSection: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSection: {
    width: "100%",
    flex: 4,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    marginTop: 30,
    margin: 10,
  },
  goalText: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "pink",
    padding: 10,
    borderRadius: 10,
  },
});
