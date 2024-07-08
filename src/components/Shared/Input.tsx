import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

const MyInput = ({ ...props }: TextInputProps) => {
  return <TextInput mode='outlined' {...props} />;
};

export default MyInput;
