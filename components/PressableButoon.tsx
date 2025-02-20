import {
  Pressable,
  StyleProp,
  ViewStyle,
  View,
  Text,
  StyleSheet,
} from "react-native";
import React from "react";

interface PressableButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export default function PressableButton({
  children,
  onPress,
  style,
  pressedStyle,
}: PressableButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressed,
        pressed && pressedStyle,
      ]}
      android_ripple={{
        color: "#dddddd",
      }}
    >
      <View style={styles.buttonContainer}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#5e0acc",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
