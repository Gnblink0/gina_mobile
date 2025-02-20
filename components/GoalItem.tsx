import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';

interface GoalItemProps {
  id: string;
  text: string;
  onDeleteGoal: (id: string) => void;
}

export default function GoalItem({ id, text, onDeleteGoal }: GoalItemProps) {

  const onPress = () => {
    router.navigate(`/goals/${id}?sort=asc`);
  }
  return (
    <Pressable style={[styles.goalItem, styles.textContainer]}>
      <Text style={styles.goalText}>{text}</Text>
      <Button title="X" onPress={() => onDeleteGoal(id)} color="red" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  goalText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#fce8d4",
  },
  textContainer: {
    
  },
});
