import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { getGoalFromDB, GoalData, updateDB } from "@/Firebase/firestoreHelper";

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
            <Button title="Warning" onPress={handleWarningPress} />
          ),
        }}
      />
      <Text style={{ color: warning ? "red" : "black" }}>{goal?.text}</Text>
    </View>
  );
}
