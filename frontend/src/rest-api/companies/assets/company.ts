interface CompanySimple {
  symbol: string;
  name: string;
}

interface Company {
  founded: number;
  employees: number;
  summary: string;
  symbol: string;
  name: string;
  shortName: string;
  keywords: string;
  logo: string;
  stockPrice: number;
  stockPriceChange: number;
  week52High: number;
  week52Low: number;
  lastTradeTime: number,
  latestUpdate: number,
}

interface ValuationAndEarnings {
  freeCashFlowYield: number;
  dividendYield: number;
  marketCap: number;
  priceEarningsRatioLtm: number;
  priceBookRatio: number;
  peg: number;
  totalReturnLtm: number;
  totalReturn5y: number;
  totalReturn10y: number;
  freeCashFlowPerShareLtm: number;
  freeCashFlowPerShare5y: number;
  freeCashFlowPerShare10y: number;
  earningsPerShareLtm: number;
  earningsPerShare5y: number;
  earningsPerShare10y: number;
}

export {
  Company,
  CompanySimple,
  ValuationAndEarnings,
};
