import { Company, Financial, ValuationAndEarnings } from '@/rest-api/companies/assets';

export interface ListCompany {
  company: Company;
  valuationAndEarnings: ValuationAndEarnings;
  financials: Financial[];
}

export interface List {
  id: number;
  name: string;
  companies: ListCompany[];
}

export interface LightList {
  id: number;
  name: string;
  isAdded: boolean;
}
