import { apiClient } from '../api';

import {
  AccessToken,
  User,
} from './assets';

export const login = async (email: string, password: string): Promise<AccessToken> => apiClient.post('user/login', { username: email, password }, 'form');

export const register = async (email: string, password: string): Promise<User> => apiClient.post('user/register', { email, password });
