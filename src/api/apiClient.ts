// src/apiClient.ts
import { useAuthStore } from '../store/useStore';
import { apiUrl } from '../constants';

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const { token } = useAuthStore.getState();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    Authorization: `JWT ${token}`,
  };

  const response = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export default fetchWithAuth;