import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { RadioButton as PaperRadioButton } from 'react-native-paper';

type RadioButtonProps = {
  label?: string;
  value: string;
};

const RadioButton = ({ label, value }: RadioButtonProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <PaperRadioButton value={value} />
      {label && (
        <Text style={{ marginLeft: 8 }}>{label}</Text>
      )}
    </View>
  );
};

export default RadioButton;
