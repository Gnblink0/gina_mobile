import { Stack } from "expo-router/stack";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";
import { ActivityIndicator, View } from "react-native";
import { router, Slot } from "expo-router";

export default function RootLayout() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    if (userLoggedIn) {
      router.replace("/(protected)/");
    } else if (!userLoggedIn) {
      router.replace("/(auth)/login");
    }
  }, [userLoggedIn]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return <Slot />;
}
