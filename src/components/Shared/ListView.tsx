import React from 'react';
import { View, Image } from 'react-native';
import { List, IconButton, Text, TouchableRipple } from 'react-native-paper';
import { COLOURS } from '../../constants';

export type ListViewProps = {
  title: string;
  image?: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  endText?: string;
  imageType?: 'url' | 'relative';
};

const ListView = ({ 
  title, 
  subtitle, 
  image, 
  onPress, 
  showChevron = true,
  endText, 
  imageType 
}: ListViewProps) => {

  const renderImage = () => {
    if (image) {
      return (
        <Image
          source={imageType === "relative" ? image : { uri: image }}
          style={{ height: 35, width: 35, resizeMode: 'contain' }}
        />
      );
    }
    return null;
  };

  const renderEndComponent = () => {
    if (showChevron) {
      return <IconButton icon="chevron-right" size={24} />;
    }
    return <Text style={{ fontSize: 12, color: COLOURS.black }}>{endText}</Text>;
  };

  return (
    <TouchableRipple onPress={onPress} style={{ backgroundColor: COLOURS.white }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {renderImage()}
          <View style={{ marginLeft: 16 }}>
            <Text style={{ fontSize: 14 }}>{title}</Text>
            {subtitle && (
              <Text style={{ fontSize: 12, color: COLOURS.black }}>{subtitle}</Text>
            )}
          </View>
        </View>
        {renderEndComponent()}
      </View>
    </TouchableRipple>
  );
};

export default ListView;

ListView.defaultProps = {
  showChevron: true,
};
