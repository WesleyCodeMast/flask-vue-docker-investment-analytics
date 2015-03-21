import { apiClient } from '@/rest-api/api';

import { List, LightList } from './assets';

export const get = async (id: number, period: string): Promise<List> => apiClient.get(`lists/${id}`, { period }); // eslint-disable-line

export const create = async (name: string): Promise<LightList> => apiClient.post('lists/create', { name });

export const edit = async (id: number, name: string): Promise<LightList> => apiClient.post(`lists/${id}/edit`, { name });

export const removeList = async (id: number): Promise<undefined> => apiClient.post(`lists/${id}/delete`);

export const lists = async (symbol?: string): Promise<LightList[]> => apiClient.get('lists', { symbol });

export const add = async (id: number, symbol: string): Promise<undefined> => apiClient.post(`lists/${id}/company/add/${symbol}`);

export const remove = async (id: number, symbol: string): Promise<undefined> => apiClient.post(`lists/${id}/company/delete/${symbol}`);
