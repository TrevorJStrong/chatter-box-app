import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTab from "./BottomNavigation";
import AuthStack from "./AuthStack";
import useAuthentication from "../hooks/useAuthentication";

const Stack = createNativeStackNavigator();

const RootStack = () => {
    const { isLoading, isValidToken } = useAuthentication();

    if (isLoading) {
        return null;
    }

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {!isValidToken ? 
                <Stack.Screen name="Auth" component={AuthStack} />
            :
                <Stack.Screen name="Main" component={BottomTab} />
            }
        </Stack.Navigator>
    );
};

export default RootStack;