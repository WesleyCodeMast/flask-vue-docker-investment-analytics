import { TableData } from '@/components/ui/table-column/types';

import { ratio, percentage } from '@/services/renderers';

import listData from './mock';

export const tableData: TableData = { // eslint-disable-line
  data: listData,
  columns: [
    {
      name: 'Name',
      key: 'name',
    },
    {
      name: 'Today',
      key: 'company.stockPrice',
    },
    {
      name: '52 weeks',
      key: 'change',
    },
    {
      name: 'P/E LTM',
      key: 'valuationAndEarnings.priceEarningsRatioLtm',
      handler: ratio,
    },
    {
      name: 'FCF Yield',
      key: 'valuationAndEarnings.freeCashFlowYield',
      handler: percentage,
    },
    {
      name: 'Total return',
      key: 'totalReturn',
    },
    {
      name: 'FCF Growth',
      key: 'freeCashFlowGrowth',
      handler: percentage,
    },
    {
      name: 'EPS Growth',
      key: 'earningsPerShareGrowth',
      handler: percentage,
    },
    {
      name: 'EPS Growth 5Y',
      key: 'valuationAndEarnings.earningsPerShare5y',
      handler: percentage,
    },
    {
      name: 'Last 4Q vs Forecast',
      key: 'priceChange',
    },
    {
      name: 'Your price alert (S)',
      key: 'priceChange',
    },
    {
      name: 'ROA',
      key: 'roa',
      handler: percentage,
    },
    {
      name: 'ROE',
      key: 'roe',
      handler: percentage,
    },
    {
      name: 'Leverage',
      key: 'leverage',
    },
    {
      name: 'Comment sign',
      key: 'comment',
    },
  ],
};
