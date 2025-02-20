import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';
import PressableButton from './PressableButoon';
import { color } from 'html2canvas/dist/types/css/types/color';

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
    <Pressable
      style={({ pressed }) => {
        return [styles.textContainer, pressed && styles.pressedStyle];
      }}
      onPress={onPress} 
      android_ripple={{
        color: "#dddddd",
        borderless: false,
        foreground: true,
        radius: 300,
      }}
    >
      <Text style={styles.goalText}>{text}</Text>
      <PressableButton onPress={() => onDeleteGoal(id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>X</Text>
      </PressableButton>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  goalText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#fce8d4",
  },
  pressedStyle: {
    backgroundColor: "#f0f0f0",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
