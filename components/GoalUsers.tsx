import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { readAllFromDB, writeToDB } from "@/Firebase/firestoreHelper";
import { User } from "@/types";
import { GoalData } from "@/types";

interface GoalUsersProps {
  goalId: string;
}

export const GoalUsers = ({ goalId }: GoalUsersProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        // read all users from the database
        const usersFromDB = await readAllFromDB(`goals/${goalId}/users`);
        console.log(usersFromDB);
        if (usersFromDB) {
          setUsers(usersFromDB as User[]);
          return;
        } 
        // if no users are found, fetch users from the API
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error(`Something went wrong with the ${res.status} code`);
        }
        const userData = await res.json();
        setUsers(userData);

        for (const user of userData) {
          await writeToDB(user, `goals/${goalId}/users`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, [goalId]);
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default GoalUsers;

const styles = StyleSheet.create({});
