import { Stack } from "expo-router/stack";

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
        }}
      />
      <Stack.Screen
        name="goals/[id]"
        options={{
          title: "Goal Details",
        }}
      />
    </Stack>
  );
}
