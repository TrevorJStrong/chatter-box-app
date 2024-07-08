import React from 'react';
import { View } from 'react-native';
import { Button, Text, IconButton, Card } from 'react-native-paper';
import { COLOURS } from '../../constants';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  buttonText?: string;
  onPress?: () => void;
}

const EmptyState = ({ title, description, icon, buttonText, onPress }: EmptyStateProps) => {
  return (
    <View style={{ width: '100%', alignItems: 'center', paddingVertical: 20 }}>
      <Card style={{ width: '90%', backgroundColor: 'gray', padding: 20, borderRadius: 8 }}>
        <Card.Content style={{ alignItems: 'center' }}>
          {icon ? <IconButton icon={icon} size={24} /> : <IconButton icon="information" size={24} />}
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 8 }}>
            {title}
          </Text>
          {description && (
            <Text style={{ textAlign: 'center', marginVertical: 8 }}>
              {description}
            </Text>
          )}
          {buttonText && (
            <Button
              mode="contained"
              onPress={onPress}
              contentStyle={{ paddingVertical: 6, paddingHorizontal: 24 }}
              style={{ marginTop: 16 }}
            >
              <Text style={{ color: COLOURS.white }}>{buttonText}</Text>
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

export default EmptyState;
