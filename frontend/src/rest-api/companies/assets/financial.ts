import { CEO } from './ceo';

interface Financial {
  year: number | string;
  quarter?: number | null;
  netIncome?: number | null;
  sharesOutstanding?: number | null;
  cashFlowFromOperatingActivities?: number | null;
  dividendsPerShare?: number | null;
  dividendYield?: number | null;
  revenue?: number | null;
  capex?: number | null;
  totalAssets?: number | null;
  totalLiabilities?: number | null;
  netDebt?: number | null;
  interestCoverage?: number | null;
  minStockPrice?: number | null;
  maxStockPrice?: number | null;
  freeCashFlow?: number | null;
  freeCashFlowYield?: number | null;
  freeCashFlowPerShare?: number | null;
  percentageCfoOfRevenue?: number | null;
  dividendsPayout?: number | null;
  revenueChange?: number | null;
  margin?: number | null;
  capexChange?: number | null;
  shareholdersEquity?: number | null;
  roa?: number | null;
  roe?: number | null;
  minPeRatioLtm?: number | null;
  maxPeRatioLtm?: number | null;
  earningsPerShare?: number | null;
  totalAssetsChange?: number | null;
  percentageLiabilitiesOfAssets?: number | null;
  sharesOutstandingChange?: number | null;
  averageMarketCap?: number | null;
  averageStockPrice?: number | null;
}

interface FinancialResponse {
  financials: Financial[];
  average: Financial[];
  terminal: Financial[];
  ceo: CEO[];
}

export {
  Financial,
  FinancialResponse,
};
