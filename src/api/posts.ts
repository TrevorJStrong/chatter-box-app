import { PostData } from '../types';
import { useAuthStore } from '../store/useStore';
import { apiUrl } from '../constants';

export const fetchPosts = async (): Promise<PostData[]> => {
  const { token } = useAuthStore.getState();
  const response = await fetch(`${apiUrl}/posts`, {
    headers: { Authorization: `JWT ${token}` },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const searchPosts = async (search: string): Promise<PostData[]> => {
  const { token } = useAuthStore.getState();
  const response = await fetch(`${apiUrl}/posts/search/${search}`, {
    headers: { Authorization: `JWT ${token}` },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};