import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface GoalItemProps {
  text: string;
}

export default function GoalItem({ text }: GoalItemProps) {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  goalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  goalItem: {
    width: "100%",
    padding: 10,
    height: 300,
    marginBottom: 40,
    borderRadius: 10,
    backgroundColor: "pink",
  },
});