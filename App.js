import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query'
import { PaperProvider } from 'react-native-paper';
import { queryClient } from './queryClient';

if (__DEV__) {
  require('./reactotron.ts');
}

import RootStack from './src/navigation';
import { COLOURS } from './src/constants';
import useCachedResources from './src/hooks/useCachedResources';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const MyTheme = {
  colors: {
    primary: 'blue',
    backgroundColor: COLOURS.white
  },
};

export default function App() {
  const appIsReady = useCachedResources();

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={MyTheme}>
            <RootStack />
          </NavigationContainer>
        </QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}