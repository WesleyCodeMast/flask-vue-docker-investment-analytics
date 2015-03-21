import {
  usd,
  ratio,
  numeric,
  percentage,
  round,
} from '@/components/ui/table/types/renderers';

export const tableRows = [  // eslint-disable-line
  {
    name: 'Earnings per share',
    prop: 'earningsPerShare',
    renderer: ratio,
  },
  {
    name: 'Free cash flow per share',
    prop: 'freeCashFlowPerShare',
    renderer: ratio,
  },
  {
    name: 'Dividends per share',
    prop: 'dividendsPerShare',
    renderer: ratio,
  },
  {
    name: 'Dividends payout, %',
    prop: 'dividendsPayout',
    renderer: percentage,
  },
  {
    name: undefined,
    prop: undefined,
  },
  {
    name: 'Revenue',
    prop: 'revenue',
    renderer: usd,
  },
  {
    name: 'ㅤ% Change',
    prop: 'revenueChange',
    renderer: percentage,
  },
  {
    name: 'Net Income',
    prop: 'netIncome',
    renderer: numeric,
  },
  {
    name: 'ㅤ% Margin',
    prop: 'margin',
    renderer: percentage,
  },
  {
    name: undefined,
    prop: undefined,
  },
  {
    name: 'CFO',
    prop: 'cashFlowFromOperatingActivities',
    renderer: numeric,
  },
  {
    name: 'ㅤ% Of revenue',
    prop: 'percentageCfoOfRevenue',
    renderer: percentage,
  },
  {
    name: 'CAPEX',
    prop: 'capex',
    renderer: numeric,
  },
  {
    name: 'ㅤ% Change',
    prop: 'capexChange',
    renderer: percentage,
  },
  {
    name: 'FCFF',
    prop: 'freeCashFlow',
    renderer: numeric,
  },
  {
    name: undefined,
    prop: undefined,
  },
  {
    name: 'Total assets',
    prop: 'totalAssets',
    renderer: numeric,
  },
  {
    name: 'ㅤ% Change',
    prop: 'totalAssetsChange',
    renderer: percentage,
  },
  {
    name: 'Total liabilities',
    prop: 'totalLiabilities',
    renderer: numeric,
  },
  {
    name: 'ㅤ% Of assets',
    prop: 'percentageLiabilitiesOfAssets',
    renderer: percentage,
  },
  {
    name: 'Shareholders Equity',
    prop: 'shareholdersEquity',
    renderer: numeric,
  },
  {
    name: 'Net Debt',
    prop: 'netDebt',
    renderer: numeric,
  },
  {
    name: 'Shares Outstanding',
    prop: 'sharesOutstanding',
    renderer: round,
    size: 8,
  },
  {
    name: 'ㅤ% Change',
    prop: 'sharesOutstandingChange',
    renderer: percentage,
  },
  {
    name: undefined,
    prop: undefined,
  },
  {
    name: 'ROA',
    prop: 'roa',
    renderer: percentage,
  },
  {
    name: 'ROE',
    prop: 'roe',
    renderer: percentage,
  },
  {
    name: 'Interest coverage',
    prop: 'interestCoverage',
    renderer: numeric,
  },
  {
    name: 'Dividend Yield',
    prop: 'dividendYield',
    renderer: ratio,
  },
  {
    name: 'P/E Ratio LTM',
    prop: 'peRatio',
    renderer: ratio,
  },
  {
    name: 'Stock price change',
    prop: 'stockPriceChange',
  },
  {
    name: 'Average Market Cap',
    prop: 'averageMarketCap',
    renderer: numeric,
  },
  {
    name: 'FCF Yield',
    prop: 'freeCashFlowYield',
    renderer: percentage,
  },
  {
    name: 'Average stock price',
    prop: 'averageStockPrice',
    renderer: round,
  },
];
