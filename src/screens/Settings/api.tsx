import axios from 'axios';
import { apiUrl } from '../../constants';
import { useAuthStore } from '../../store/useStore';

export const fetchProfile = async () => {
  const { userId } = useAuthStore.getState();
  try {
    const response = await axios.get(`${apiUrl}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
