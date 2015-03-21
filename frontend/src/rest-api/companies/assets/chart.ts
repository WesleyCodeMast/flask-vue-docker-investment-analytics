export interface ChartData {
  label: string;
  value: number;
}

export interface Chart {
  [key: string]: ChartData[];
}
