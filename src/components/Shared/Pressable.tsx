import React, { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';

export type Props = {
  style?: object;
  onPress: () => void;
  scale?: number;
  disabled?: boolean;
  children: ReactNode;
}

const MyPressable = ({
  children,
  style,
  onPress,
  disabled,
  scale,
  ...props
}: Props) => {
  return (
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }}
        disabled={disabled}
      >
        {({ isHovered, isPressed }: any) => {
          const isActive = isHovered || isPressed;
          return (
            <View
              style={[
                {
                  opacity: isActive ? 0.8 : 1,
                  transform: [
                    {
                      scale: isPressed ? scale : 1,
                    },
                  ],
                },
                style,
              ]}
              {...props}
            >
              {children}
            </View>
          );
        }}
      </Pressable>
  );
};

export default MyPressable;
