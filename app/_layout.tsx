import { Stack } from "expo-router/stack";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";
import { ActivityIndicator, View } from "react-native";
import { router, Slot, useSegments } from "expo-router";

export default function RootLayout() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserLoggedIn(true);
      } else {
        // User is signed out
        setUserLoggedIn(false);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inProtectedGroup = segments[0] === "(protected)";

    if (userLoggedIn && inAuthGroup) {
      router.replace("/(protected)/");
    } else if (!userLoggedIn && inProtectedGroup) {
      router.replace("/(auth)/login");
    }
  }, [userLoggedIn, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="(auth)" options={{ animation: "slide_from_left" }} />
      <Stack.Screen
        name="(protected)"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
}
