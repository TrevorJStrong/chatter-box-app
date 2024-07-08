import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

const useNotifications = () => {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const navigation = useNavigation();

  useEffect(() => {
    if (lastNotificationResponse) {
      // Get the data from the notification
      const { data } = lastNotificationResponse.notification.request.content;

      // Check the notification data and navigate accordingly
      // navigation.navigate(data.screen);

      // Add more conditions for different screens as needed
    }
  }, [lastNotificationResponse, navigation]);

  return null;
};

export default useNotifications;
