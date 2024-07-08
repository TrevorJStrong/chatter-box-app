import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../screens/Settings/SettingsScreen';
import { SettingsStackParamList } from './types';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Settings" 
                component={SettingsScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}