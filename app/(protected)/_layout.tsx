import { Stack } from "expo-router/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f4511e" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "My Goals",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/profile")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: 15,
              })}
            >
              <MaterialIcons name="person" size={24} color="#fff" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="goals/[id]"
        options={{
          title: "Goal Details",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerRight: () => (
            <Pressable
              onPress={async () => {
                try {
                  await signOut(auth);
                } catch (error) {
                  console.error("Error signing out:", error);
                }
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: 15,
              })}
            >
              <MaterialIcons name="logout" size={24} color="#fff" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
