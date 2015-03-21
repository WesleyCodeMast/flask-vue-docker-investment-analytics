import { apiClient } from '@/rest-api/api';

import { Comment } from './assets';

export const create = (symbol: string, field: string, column: string, title: string, text: string): Promise<Comment> => apiClient.post(`comment/company/${symbol}/create`, {
  field, column, title, text,
});

export const update = (id: number, title: string, text: string): Promise<Comment> => apiClient.post(`comment/${id}/update`, { title, text });

export const remove = (id: number): Promise<undefined> => apiClient.post(`comment/${id}/delete`);

export const get = (symbol: string): Promise<Comment[]> => apiClient.get(`comment/company/${symbol}`);
