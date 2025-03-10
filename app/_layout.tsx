import { Stack } from "expo-router/stack";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Temporary mock authentication
    setIsAuthenticated(false);
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
