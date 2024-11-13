import { PostData } from '../types';
import fetchWithAuth from './apiClient';

export const fetchPosts = async (): Promise<PostData[]> => {
  const response = await fetchWithAuth('/posts');
  return response.json();
};

export const searchPosts = async (search: string): Promise<PostData[]> => {
  const response = await fetchWithAuth(`/posts/search/${search}`);
  return response.json();
};