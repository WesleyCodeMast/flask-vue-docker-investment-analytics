export const negative = (value: number) => {
  if ([undefined, NaN, null, 0].includes(value)) {
    return '-';
  }
  if (value < 0) {
    return `(${Math.abs(value).toLocaleString()})`;
  }
  return value.toLocaleString();
};

export const ratio = (value: number) => {
  const processed = negative(Math.round(value * 100) / 100);
  return value && processed ? processed : '-';
};

export const singleRatio = (value: number) => negative(Math.round(value * 10) / 10);

export const percentage = (value: number) => {
  const processed = negative(Math.round(value * 10) / 10);
  return processed !== '-' ? `${processed}%` : processed;
};

export const percentageAverage = (value: number) => {
  const processed = percentage(value);
  return processed !== '-' ? `${processed} A` : processed;
};

export const money = (value: number) => {
  const rounded = Math.floor(value / 1_000_000);
  return negative(rounded);
};

export const dollars = (value: number) => `$ ${money(value)}`;

export const rounded = (value: number) => negative(Math.round(value));
