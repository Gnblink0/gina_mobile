import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { getGoalFromDB } from '@/Firebase/firestoreHelper';

export default function GoalDetails() {
  const [goal, setGoal] = useState<any>(null);
  const { id } = useLocalSearchParams<{id: string}>();
  useEffect(() => {
    const goal = async () => {
      const goal = await getGoalFromDB(id as string, "goals");
      setGoal(goal);
    }
    goal();
  }, []);
  return (
    <View>
      <Text>Details of {goal?.text}</Text>
    </View>
  )
}