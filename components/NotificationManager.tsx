import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React from 'react'
import { scheduleNotificationAsync, SchedulableTriggerInputTypes, getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications'

const NotificationManager = () => {
  const verifyPermissions = async () => {
    const permissionResponse = await getPermissionsAsync();
    if (permissionResponse?.granted) return true;

    const responseAfterRequest = await requestPermissionsAsync();

    if (responseAfterRequest?.granted) return true;
    return false;
  };

  const scheduleNotificationHandler = async () => {
    console.log("Remind me to add my daily goals");
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert(
          "Permission not granted",
          "Please grant permission to use notifications"
        );
        return;
      }
      await scheduleNotificationAsync({
        content: {
          title: "Remind me to add my daily goals",
          body: "Don't forget to add your daily goals",
        },
      trigger: {
        seconds: 5,
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button title="Remind me to add my daily goals" onPress={scheduleNotificationHandler} />
    </View>
  )
}

export default NotificationManager

const styles = StyleSheet.create({})