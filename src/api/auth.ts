import { useAuthStore } from '../store/useStore';
import { apiUrl } from '../constants';

export const checkToken = async () => {
    const { token } = useAuthStore.getState();
    const response = await fetch(`${apiUrl}/check-token`, {
      headers: { Authorization: `JWT ${token}` },
    });
    return response.json();
};
  