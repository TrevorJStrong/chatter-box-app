import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { fetchProfile } from './api';
import { ContentLoader } from '../../components/Shared';
import { COLOURS } from '../../constants';

const SettingsScreen = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ['fetch-profile'],
    queryFn: fetchProfile,
  });

  if (isPending) {
    <ContentLoader />;
  }

  if (error) {
    console.log(error);
  }

  React.useEffect(() => {
    console.log(data, 'data');
  }, [data]);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image
          source={{ uri: data?.profile_image }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.userDetails}>
        <Text variant='headlineSmall'>{data?.first_name} {data?.last_name}</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: COLOURS.secondary,
    height: '40%'
  },
  profileImage: {
    position: 'absolute',
    top: 70,
    height: 100,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  userDetails: {
    alignSelf: 'center',
    marginTop: 50,
    padding: 10
  }
});
