import React from 'react';
import { Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

import Pressable from './Pressable';
import { COLOURS } from '../../constants';
import { View } from 'react-native';

type BackBtnProps = {
  color?: string;
};

const BackBtn = ({ color = COLOURS.black }: BackBtnProps) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={navigation.goBack} scale={0.92}>
      <View style={{ padding: 5 }}>
        <Entypo name="chevron-left" size={24} color={color}  />
      </View>
    </Pressable>
  );
};

export default BackBtn;
