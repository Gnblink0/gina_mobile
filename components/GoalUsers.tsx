import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const GoalUsers = () => {
  interface User {
    id: number;
    name: string;
    email: string;
  }
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        setUsers(await res.json());
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
      <FlatList data={users} renderItem={({item}) => <Text>{item.name}</Text>} />
    </View>
  );
}

export default GoalUsers

const styles = StyleSheet.create({})