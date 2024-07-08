import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '../../store/useStore';
import { ScrollView } from '../../components/Shared';
import { registerUser } from './api';

const RegisterScreen = ({ navigation }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
  });

  const { login, updateToken } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      updateToken(data.token);
      login();
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      Alert.alert('Error', error.message);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text variant="titleLarge" style={styles.label}>
          Register Now
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="First Name"
              style={styles.input}
              placeholder="Enter First Name"
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="first_name"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Last Name"
              style={styles.input}
              placeholder="Enter Last Name"
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="last_name"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
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
        >
          Register
        </Button>

        <View style={styles.registerContainer}>
          <Text style={styles.alreadtHaveAccount}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ textDecorationLine: 'underline' }}>Login here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    color: '#000',
    margin: 10,
    marginLeft: 0,
  },
  input: {
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  registerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  alreadtHaveAccount: {
    padding: 0,
    textAlign: 'center',
  },
});
