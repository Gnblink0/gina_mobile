import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { useState, useEffect } from "react";
import GoalItem from "../../components/GoalItem";
import { database, auth } from "../../Firebase/firebaseSetup";
import {
  writeToDB,
  deleteFromDB,
  deleteAllFromDB,
} from "../../Firebase/firestoreHelper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { GoalData } from "@/types";

interface GoalDB {
  id: string;
  text: string;
}

export default function App() {
  const appName = "my awesome app";
  const [inputText, setInputText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState<GoalDB[]>([]);

  useEffect(() => {
    if (!auth.currentUser) {
      setGoals([]);
      return;
    }

    const unsubscribe = onSnapshot(
      query(
        collection(database, "goals"),
        where("owner", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setGoals([]);
        } else {
          const updatedGoals: GoalDB[] = [];
          querySnapshot.forEach((doc) => {
            updatedGoals.push({ id: doc.id, text: doc.data().text });
          });
          setGoals(updatedGoals);
        }
      },
      (error) => {
        console.error("Error listening to goals: ", error);
      }
    );

    return () => unsubscribe();
  }, [auth.currentUser]);

  const handleInputData = async (text: string, imageUri: string) => {
    const goal = {
      text: text,
      imageUri: imageUri,
      owner: auth.currentUser?.uid,
    };

    try {
      const id = await writeToDB(goal, "goals");
      console.log("Goal added with ID: ", id);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding goal: ", error);
    }
  };

  function handleCancel() {
    setIsModalVisible(false);
  }

  function handleDeleteGoal(id: string) {
    console.log("Attempting to delete goal with ID:", id);
    deleteFromDB(id, "goals")
      .then(() => {
        console.log("Goal deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete goal: ", error);
      });
  }

  function handleDeleteAll() {
    Alert.alert(
      "Delete all goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            deleteAllFromDB("goals")
              .then(() => {
                console.log("All goals deleted successfully");
              })
              .catch((error) => {
                console.error("Failed to delete all goals: ", error);
              });
          },
        },
      ]
    );
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
          contentContainerStyle={{ flex: 1, alignItems: "center" }}
          data={goals}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>No goals to show</Text>
          )}
          ListHeaderComponent={() =>
            goals.length > 0 && (
              <Text style={styles.listHeaderText}>My Goals List</Text>
            )
          }
          ListFooterComponent={() =>
            goals.length > 0 && (
              <TouchableOpacity onPress={handleDeleteAll}>
                <Text style={styles.listFooterText}>Delete all</Text>
              </TouchableOpacity>
            )
          }
          renderItem={({ item, separators }) => (
            <GoalItem
              text={item.text}
              id={item.id}
              onDeleteGoal={handleDeleteGoal}
              onPressIn={() => separators.highlight()}
              onPressOut={() => separators.unhighlight()}
            />
          )}
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={[
                styles.separator,
                highlighted && styles.separatorHighlighted,
              ]}
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
  },
  goalList: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 15,
    color: "gray",
  },
  listHeaderText: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 20,
    color: "black",
  },
  listFooterText: {
    textAlign: "center",
    marginTop: 15,
    color: "red",
    backgroundColor: "pink",
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  separatorHighlighted: {
    backgroundColor: "#f4511e",
    height: 2,
  },
});
