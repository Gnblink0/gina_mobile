import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const GoalUsers = () => {
  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(`Something went wrong with the ${res.status} code`);
        } 
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);
  return (
    <View>
      <Text>GoalUsers</Text>
    </View>
  );
}

export default GoalUsers

const styles = StyleSheet.create({})