import { Stack } from "expo-router/stack";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f4511e" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
        }}
      />
    </Stack>
  );
}
