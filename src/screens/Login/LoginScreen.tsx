import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { useAuthStore } from '../../store/useStore';
import { ScrollView } from '../../components/Shared';
import { COLOURS, apiUrl } from '../../constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackNavigatorParamsList } from '../../navigation/types';

type ScreenProps = NativeStackScreenProps<AuthStackNavigatorParamsList, 'Login'>

const loginUser = async (data) => {
  const { email, password } = data;
  const response = await axios.post(`${apiUrl}/login`, { email, password });
  return response.data;
};

const LoginScreen = ({ navigation }: ScreenProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { login, updateToken, setUserId } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data, 'show data');
      updateToken(data?.token);
      setUserId(data?.user?._id);
      login();
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data?.message || 'Unknown error';
      Alert.alert('Login Error', errorMessage);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text variant="titleLarge" style={styles.welcome}>
          Welcome
        </Text>
        {errors.email && (
          <Text variant="labelLarge" style={styles.error}>
            Email is required
          </Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              style={styles.input}
              placeholder="Enter Email"
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true }}
        />
        {errors.password && (
          <Text variant="labelLarge" style={styles.error}>
            Password is required
          </Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              style={styles.input}
              placeholder="Enter Password"
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          loading={isPending}
        >
          Login
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text variant="bodyMedium" style={styles.registerHere}>
            Or Register Here
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.white,
    justifyContent: 'center',
    padding: 20,
  },
  welcome: {
    color: COLOURS.black,
    margin: 10,
    textAlign: 'center',
    marginLeft: 0,
  },
  input: {
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  registerHere: {
    marginTop: 20,
    textAlign: 'center',
  },
  error: {
    color: COLOURS.error,
    marginTop: 10,
  },
});
