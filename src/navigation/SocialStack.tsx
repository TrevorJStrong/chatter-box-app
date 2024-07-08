import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FriendsScreen from '../screens/Friends/FriendsScreen';
import MessagingScreen from '../screens/Friends/MessagingScreen';

type SocialStackParamList = {
    FriendsList: undefined;
    Messaging: undefined;
};

const Stack = createNativeStackNavigator<SocialStackParamList>();

export default function SocialStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="FriendsList" 
                component={FriendsScreen}
                options={{
                    headerTitle: 'Social Hub',
                    headerTransparent: false,
                    headerLargeTitle: true,
                    headerShadowVisible: false,
                    headerLargeTitleShadowVisible: false,
                    headerLargeTitleStyle: {
                        color: 'black',
                    },
                }}
            />
            <Stack.Screen name="Messaging" component={MessagingScreen} />
        </Stack.Navigator>
    );
}