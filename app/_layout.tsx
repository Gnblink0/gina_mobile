import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f4511e" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Home" }}
      />
      <Stack.Screen name="goals/[id]" />
    </Stack>
  );
}
