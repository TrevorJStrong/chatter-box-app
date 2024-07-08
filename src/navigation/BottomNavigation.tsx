import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import SettingStack from './SettingsStack';
import SocialStack from './SocialStack';
import { RootTabParamList } from "./types";
import { IconSizes } from "../constants";

const Tab = createBottomTabNavigator<RootTabParamList>();
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={IconSizes.small} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="SocialTab" 
        component={SocialStack}
        options={{
          tabBarLabel: 'Social',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-friends" size={IconSizes.small} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="SettingsTab" 
        component={SettingStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cog" size={IconSizes.small} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;