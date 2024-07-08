import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/HomeScreen';
import CreatePostScreen from '../screens/Home/CreatePost';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} 
                options={{
                    headerTitle: 'Home',
                    headerTransparent: false,
                    headerLargeTitle: true,
                    headerShadowVisible: false,
                    headerLargeTitleShadowVisible: false,
                    headerLargeTitleStyle: {
                        color: 'black',
                    },
                }}
            />
            <Stack.Screen 
                name="CreatePost" 
                component={CreatePostScreen}
            />
        </Stack.Navigator>
    );
};