import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

const CustomScrollView = ({ children, ...props }: ScrollViewProps) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default CustomScrollView;
