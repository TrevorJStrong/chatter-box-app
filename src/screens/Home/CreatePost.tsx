import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { QueryClient, useMutation } from '@tanstack/react-query';

import FormFieldController from '../../components/controllers/FormFieldController';
import axios, { AxiosError } from 'axios';
import { apiUrl } from '../../constants';
import { useAuthStore } from '../../store/useStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';

type ScreenProps = NativeStackScreenProps<HomeStackParamList, 'CreatePost'>;

const queryClient = new QueryClient();

const CreatePostScreen = ({ navigation }: ScreenProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      message: '',
    },
  });

  const { userId, token } = useAuthStore();

  const createPost = async (data) => {
    const { title, message } = data;
    const response = await axios.post(`${apiUrl}/posts`, {
        title, 
        message, 
        user_id: userId 
    },
    {
      headers: { Authorization: `JWT ${token}` },
    }
    );
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      Alert.alert(`${data.post.title} created`);
      navigation.navigate('Home');
    },
    onError: (error) => {
      console.log(error, 'error')
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data?.message || 'Unknown error';
      Alert.alert('Create Post Error', errorMessage);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
    Keyboard.dismiss();
  };

  return (
    <View>
      <FormFieldController
        control={control}
        name={'title'}
        isRequired={true}
        placeholder={'Enter post title'}
      />

      <FormFieldController
        control={control}
        name={'message'}
        placeholder={'Enter post message'}
        multiline={true}
        isRequired={true}
        style={{ height: 200 }}
        numberOfLines={5}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        loading={isPending}
      >
        Create Post
      </Button>
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
});
