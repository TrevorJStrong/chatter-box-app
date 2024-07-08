import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export function useOnLayoutRootView(appIsReady: boolean) {
  return useCallback(async () => {
    if (appIsReady) {
      console.log(appIsReady,'appIsReady');
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
}
