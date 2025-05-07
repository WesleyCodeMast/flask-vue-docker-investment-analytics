import { apiClient } from '@/rest-api/api';

import {
  List,
  LightList,
  ListComment,
  ListCompanyPriceSchema,
} from './assets';

export const get = async (id: number, period: string): Promise<List> => apiClient.get(`lists/${id}`, { period }); // eslint-disable-line

export const create = async (name: string, symbol?: string): Promise<LightList> => apiClient.post('lists/create', { name, symbol });

export const edit = async (id: number, name: string): Promise<LightList> => apiClient.post(`lists/${id}/edit`, { name });

export const removeList = async (id: number): Promise<undefined> => apiClient.post(`lists/${id}/delete`);

export const lists = async (symbol?: string): Promise<LightList[]> => apiClient.get('lists', { symbol });

export const add = async (id: number, symbol: string): Promise<undefined> => apiClient.post(`lists/${id}/company/add/${symbol}`);

export const remove = async (id: number, symbol: string): Promise<undefined> => apiClient.post(`lists/${id}/company/delete/${symbol}`);

export const removeCompanies = async (id: number, symbols: string[]): Promise<undefined> => apiClient.post(`lists/${id}/companies/delete`, { symbols });

export const createListComment = async (id: number, symbol: string, text: string): Promise<ListComment> => apiClient.post(`lists/${id}/comment/create`, { text, symbol });

export const updateListComment = (id: number, text: string): Promise<ListComment> => apiClient.post(`lists/comment/${id}/update`, { text });

export const removeListComment = (id: number): Promise<undefined> => apiClient.post(`lists/comment/${id}/delete`);

export const getListComment = (id: string): Promise<ListComment[]> => apiClient.get(`lists/comment/company/${id}`);

export const getListComments = (id: string): Promise<ListComment[]> => apiClient.get(`lists/${id}/comment`);

export const share = async (id: number, share: boolean): Promise<undefined> => apiClient.post(`lists/${id}/share`, { share });

export const duplicate = async (id: number): Promise<undefined> => apiClient.post(`lists/${id}/duplicate`);

export const updatePrice = async (symbol: string): Promise<ListCompanyPriceSchema> => apiClient.get(`lists/${symbol}/prices`);
