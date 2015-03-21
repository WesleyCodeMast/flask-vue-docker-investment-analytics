export interface ForecastValue {
  [key: string]: number;
}

export interface ForecastField {
  [key: string]: ForecastValue;
}

export interface Forecast {
  id: number;
  name: string;
  values: ForecastField;
  updatedAt: string;
}
