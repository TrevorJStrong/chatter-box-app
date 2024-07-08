import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTab from "./BottomNavigation";
import { useAuthStore } from "../store/useStore";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

const RootStack = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {!isAuthenticated ? 
                <Stack.Screen name="Auth" component={AuthStack} />
            :
                <Stack.Screen name="Main" component={BottomTab} />
            }
        </Stack.Navigator>
    );
};

export default RootStack;