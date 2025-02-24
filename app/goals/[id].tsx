import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { getGoalFromDB, GoalData, updateDB } from "@/Firebase/firestoreHelper";
import PressableButton from "@/components/PressableButoon";
import { StyleSheet } from "react-native";
import GoalUsers from "@/components/GoalUsers";
export default function GoalDetails() {
  const [goal, setGoal] = useState<GoalData | null>(null);
  const [warning, setWarning] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  useEffect(() => {
    const fetchGoal = async () => {
      const goalData = await getGoalFromDB(id as string, "goals");
      if (goalData) {
        setGoal(goalData as GoalData);
        setWarning(goalData.warning || false);
      }
    };
    fetchGoal();
  }, [id]);

  const handleWarningPress = async () => {
    setWarning(true);
    await updateDB(id as string, { warning: true });
  };

  return (
    <View>
      <Stack.Screen
        options={{
          title: warning ? "Warning!" : goal?.text,
          headerRight: () => (
            <PressableButton onPress={handleWarningPress} style={styles.warningButton}>
              <Text style={styles.warningText}>Warning</Text>
            </PressableButton>
          ),
        }}
      />
      <Text style={{ color: warning ? "red" : "black" }}>{goal?.text}</Text>
      <GoalUsers />
    </View>
  );
}
const styles = StyleSheet.create({
  warningButton: {
    backgroundColor: "red",
    borderColor: "white",
    borderWidth: 1,
  },
  warningText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
