import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

import Feed from './Feed/List';
import { useAuthStore } from '../../store/useStore';
import { fetchPosts, searchPosts } from '../../api/posts';
import { checkToken } from '../../api/auth';
import MyPressable from '../../components/Shared/Pressable';
import { COLOURS } from '../../constants';
import { HomeStackParamList } from '../../navigation/types';

type ScreenProps = NativeStackScreenProps<HomeStackParamList, "Home">;

const HomeScreen = ({ navigation }: ScreenProps) => {
  const { logout } = useAuthStore();
  const [search, setSearch] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => setSearch(event.nativeEvent.text),
        onClear: () => setSearch(''),
        placeholder: 'Search Posts',
        hideWhenScrolling: false,
      },
    });
  }, [navigation]);

  const debouncedSearchPosts = useCallback(
    _.debounce((query, resolve) => resolve(query), 500),
    []
  );

  const { data, error } = useQuery({
    queryKey: ['check-token'],
    queryFn: checkToken,
  });

  useEffect(() => {
    if (data?.message === 'Invalid or missing token') {
      logout();
    }

    useAuthStore.setState({ token: data?.token });
  }, [data]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error]);

  const { data: searchData, error: searchError } = useQuery({
    queryKey: ['search', search],
    queryFn: () =>
      new Promise((resolve) => debouncedSearchPosts(search, resolve)).then(() =>
        searchPosts(search)
      ),
    enabled: search.length > 2,
    initialData: [],
  });

  return (
    <View style={styles.container}>
      <MyPressable
        onPress={() => navigation.navigate('CreatePost')}
        style={styles.button}
      >
        <Text variant="labelLarge" style={styles.buttonText}>
          Create New Post
        </Text>
      </MyPressable>
      <Feed
        fetchPosts={fetchPosts}
        searchData={searchData}
        searchError={searchError}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: COLOURS.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: COLOURS.white,
    textAlign: 'center',
  },
});
