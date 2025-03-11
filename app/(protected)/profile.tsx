import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { auth } from "@/Firebase/firebaseSetup";

export default function Profile() {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{user?.uid}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
});
