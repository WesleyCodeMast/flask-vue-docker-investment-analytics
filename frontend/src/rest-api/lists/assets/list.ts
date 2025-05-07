import { Company, Financial, ValuationAndEarnings } from '@/rest-api/companies/assets';

export interface ListComment {
  id?: number;
  text: string;
  symbol: string;
  updatedAt: string;
}

export interface ListCompany {
  comment: ListComment;
  company: Company;
  valuationAndEarnings: ValuationAndEarnings;
  financials: Financial[];
  lastFinancial: Financial;
}

export interface ListCompany1 {
  companyId: string,
  symbol: string,
  name: string,

  week52High: number,
  week52Low: number,

  marketCap: number,
  netIncome: number,
  cashFlowFromOperatingActivities: number,
  freeCashFlow: number,
  capex: number,

  stockPrice: number,
  stockPriceChange: number
  priceEarningsRatioLtm: number,
  earningsPerShare10y: number,
  earningsPerShare5y: number,
  earningsPerShareLtm: number,
  freeCashFlowPerShare10y: number,
  freeCashFlowPerShare5y: number,
  freeCashFlowPerShareLtm: number,
  freeCashFlowYield: number,

  totalReturn10y: number,
  totalReturn5y: number,
  totalReturnLtm: number,

  roa: number,
  roe: number,
  leverage: number,
  comment: ListComment,
}

export interface List {
  id: number;
  name: string;
  companies: ListCompany1[];
  totalComment: ListComment;
  share: boolean;
}

export interface ListCompanyPriceSchema {
  id: number;
  symbol: string;
  stockPrice: number;
  priceChange: number;
}

export interface LightList {
  id: number;
  name: string;
  isAdded: boolean;
}
