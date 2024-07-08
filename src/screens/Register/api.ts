import axios from 'axios';
import { apiUrl } from '../../constants';

export const registerUser = async (data) => {
  const { first_name, last_name, email, password } = data;

  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`${apiUrl}/register`, {
      first_name,
      last_name,
      email,
      password,
    }, options);

    return res.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
};