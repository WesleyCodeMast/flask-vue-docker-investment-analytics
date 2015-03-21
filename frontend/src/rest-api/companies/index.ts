import { apiClient } from '../api';

import {
  Company,
  CompanySimple,
  ValuationAndEarnings,
  FinancialResponse,
  Chart,
  Forecast,
  ForecastField,
} from './assets';

export const list = async (): Promise<CompanySimple[]> => apiClient.get('company');

export const get = async (symbol: string): Promise<Company> => apiClient.get(`company/${symbol}`);

export const valuation = async (symbol: string): Promise<ValuationAndEarnings> => apiClient.get(`company/${symbol}/valuation_and_earnings`);

export const financials = async (symbol: string): Promise<FinancialResponse> => apiClient.get(`company/${symbol}/financials`);

export const chart = async (symbol: string, period: string): Promise<Chart> => apiClient.get(`company/${symbol}/chart/${period}`);

export const createForecast = async (symbol: string, name: string): Promise<Forecast> => apiClient.post(`company/${symbol}/forecast/create`, { name });

export const forecasts = async (symbol: string): Promise<Forecast[]> => apiClient.get(`company/${symbol}/forecast`);

export const saveForecast = async (symbol: string, forecastId: number, payload: ForecastField) => apiClient.post(`company/${symbol}/forecast/${forecastId}/save`, payload);
