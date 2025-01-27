import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";
import { useState } from "react";
import GoalItem from "./components/GoalItem";

interface Goal {
  id: number;
  text: string;
}

export default function App() {
  const appName = "my awesome app";
  const [inputText, setInputText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);

  function handleInputData(text: string) {
    console.log("data received from input", text);
    // setInputText(text);
    setGoals((prevGoals) => [...prevGoals, { id: Math.random(), text: text }]);
    setIsModalVisible(false);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  function handleDeleteGoal(id: number) {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
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
      <View style={styles.bottomSection}>
        <FlatList
          style={styles.goalList}
          data={goals}
          renderItem={({ item }) => (
            <GoalItem
              text={item.text}
              id={item.id}
              onDeleteGoal={handleDeleteGoal}
            />
          )}
        />
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
  bottomSection: {
    width: "100%",
    flex: 4,
    backgroundColor: "#f5f5f5",
  },
  button: {
    marginTop: 30,
    margin: 10,
  },
  goalList: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
