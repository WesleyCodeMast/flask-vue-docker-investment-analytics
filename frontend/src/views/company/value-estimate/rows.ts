import { TableRow } from '@/components/ui/table/types';

import {
  percentage,
  rounded,
  money,
  ratio,
} from '@/services/renderers';

export const estimateTableRows: TableRow[] = [  // eslint-disable-line
  {
    name: 'Required return / cost of capital',
    key: 'requiredReturn',
    showCounter: false,
    separate: true,
    editable: true,
    handler: percentage,
  },
  {
    name: 'FCFF terminal growth rate',
    key: 'freeCashFlowGrowthRate',
    showCounter: false,
    separate: false,
    editable: true,
    handler: percentage,
  },
  {
    name: 'Free cash flow forecast',
    key: 'freeCashFlow',
    showCounter: false,
    separate: false,
    handler: money,
  },
  {
    name: ' Terminal value',
    key: 'terminalValue',
    showCounter: false,
    separate: false,
    handler: money,
  },
  {
    name: 'ㅤPV breakdown',
    key: 'pvBreakdown',
    showCounter: false,
    separate: false,
    handler: money,
  },
  {
    name: 'Enterprise value / PV of FCF',
    key: 'enterpriseValue',
    showCounter: false,
    separate: false,
    handler: money,
  },
  {
    name: 'ㅤPlus / (Less): Net Debt',
    key: 'netDebtEstimate',
    showCounter: false,
    separate: false,
    handler: money,
  },
  {
    name: 'ㅤLess: preferred stock',
    key: 'preferredStock',
    showCounter: false,
    separate: false,
    handler: rounded,
  },
  {
    name: 'ㅤLess: minority interest',
    key: 'minorityInterest',
    showCounter: false,
    separate: false,
    handler: ratio,
  },
  {
    name: 'Market cap',
    key: 'averageMarketCap',
    showCounter: false,
    separate: false,
    handler: money,
  },
  {
    name: 'ㅤNumber of shares',
    key: 'sharesOutstanding',
    showCounter: false,
    separate: false,
    handler: rounded,
    size: 'var(--font-size-8)',
    weight: 600,
  },
  {
    name: 'Price per share',
    key: 'averageStockPrice',
    showCounter: false,
    separate: false,
    handler: rounded,
  },
];
