from companies.schemas import CompanyMetaSchema, FinancialMetaSchema, ValuationEarningsSchema, PriceSchema, CEOSchema

from .base import FinancialAPI
from .assets import IEXCloud

from datetime import datetime
from warnings import warn

import asyncio


class IEXCloudAPI(FinancialAPI):
    _client: IEXCloud

    def __init__(self, api_token: str):
        self._client = IEXCloud(token=api_token)

    async def get_financials(self, symbol: str, year: int, quarter: int = None) -> FinancialMetaSchema | None:
        symbol = symbol.upper()
        context = self._request_context(symbol=symbol, year=year, quarter=quarter)

        schema = FinancialMetaSchema(year=year, quarter=quarter)

        balance_sheet, fundamental_valuations, fundamentals, income = await asyncio.gather(
            self._client.time_series(id='BALANCE_SHEET', **context),
            self._client.time_series(id='FUNDAMENTAL_VALUATIONS', **context),
            self._client.time_series(id='FUNDAMENTALS', **context),
            self._client.time_series(id='INCOME', **context),
        )

        if len(balance_sheet) > 0:
            balance_sheet = balance_sheet[0]

            schema.shares_outstanding = balance_sheet.get('commonStock')
            schema.total_assets = balance_sheet.get('totalAssets')
            schema.total_liabilities = balance_sheet.get('totalLiabilities')
            schema.minority_interest = balance_sheet.get('minorityInterest') or 0

        if len(fundamental_valuations) > 0:
            fundamental_valuations = fundamental_valuations[0]

            schema.dividends_per_share = fundamental_valuations.get('dividendPerShare')
            schema.net_debt = fundamental_valuations.get('netDebt')
            schema.interest_coverage = fundamental_valuations.get('ebitToInterestExpense')
            schema.dividend_yield = fundamental_valuations.get('dividendYield')
            schema.free_cash_flow = fundamental_valuations.get('freeCashFlow')
            schema.price_earnings_ratio_ltm = fundamental_valuations.get('pToE')

        if len(fundamentals) > 0:
            fundamentals = fundamentals[0]

            schema.capex = fundamentals.get('capex')
            schema.cash_flow_from_operating_activities = fundamentals.get('cashFlowOperating')

        if len(income) > 0:
            income = income[0]

            schema.net_income = income.get('netIncome')
            schema.revenue = income.get('totalRevenue')

        if not balance_sheet and not fundamental_valuations and not fundamentals and not income:
            return None

        return schema

    async def get_historical_prices(self, symbol: str, year: int, quarter: int = None) -> list[PriceSchema]:
        symbol = symbol.upper()

        request_range = str(year)
        if quarter is not None:
            request_range = f'Q{quarter}{year}'

        prices = await self._client.time_series(id='HISTORICAL_PRICES', symbol=symbol, range=request_range)
        schemas = []

        for price in prices:
            timestamp = price.get('date', '')

            if isinstance(timestamp, int) or timestamp.isdigit():
                timestamp = datetime.utcfromtimestamp(timestamp / 1e3)
            elif len(timestamp) > 0:
                timestamp = datetime.strptime(timestamp, '%Y-%m-%d')
            else:
                continue

            schemas.append(PriceSchema(
                open=price.get('open'),
                high=price.get('high'),
                low=price.get('low'),
                close=price.get('close'),
                volume=price.get('volume'),
                timestamp=timestamp,
            ))

        return schemas

    async def get_last_prices(self, symbol: str) -> list[PriceSchema]:
        symbol = symbol.upper()

        prices = await self._client.historical_prices(symbol=symbol, range='5dm')
        schemas = []

        for price in prices:
            timestamp = price.get('date', '') + ' ' + price.get('minute', '')

            if isinstance(timestamp, int) or timestamp.isdigit():
                timestamp = datetime.utcfromtimestamp(timestamp / 1e3)
            elif len(timestamp) > 0:
                timestamp = datetime.strptime(timestamp, '%Y-%m-%d %H:%M')
            else:
                continue

            open = price.get('open')
            high = price.get('high')
            low = price.get('low')
            close = price.get('close')

            if any(x is None for x in [open, high, low, close]):
                continue

            schemas.append(PriceSchema(
                open=price.get('open'),
                high=price.get('high'),
                low=price.get('low'),
                close=price.get('close'),
                volume=0,
                timestamp=timestamp,
            ))

        return schemas

    async def get_stock_price(self, symbol: str) -> tuple[float, float, float, float]:
        symbol = symbol.upper()
        
        quote = await self._client.quote(symbol) or {}
        
        return quote.get('latestPrice'), quote.get('changePercent'), quote.get('week52High'), quote.get('week52Low')

    async def get_market_cap(self, symbol: str) -> float:
        symbol = symbol.upper()

        quote = self._client.quote(symbol) or {}

        return quote.get('marketCap', 0)

    async def get_stats(self, symbol: str) -> ValuationEarningsSchema:
        symbol = symbol.upper()
        schema = ValuationEarningsSchema()

        advanced_stats, fundamental_valuations = await asyncio.gather(
            self._client.time_series(id='ADVANCED_STATS', symbol=symbol),
            self._client.time_series(id='FUNDAMENTAL_VALUATIONS', symbol=symbol),
        )

        if len(advanced_stats) > 0:
            stats = advanced_stats[0]

            schema.dividend_yield = stats.get('dividendYield')
            schema.market_cap = stats.get('marketcap')
            schema.peg = stats.get('pegRatio')

        if len(fundamental_valuations) > 0:
            fundamental_valuations = fundamental_valuations[0]

            schema.free_cash_flow_yield = fundamental_valuations.get('fcfYield')
            schema.price_earnings_ratio_ltm = fundamental_valuations.get('pToE')
            schema.price_book_ratio = fundamental_valuations.get('pToBv')

        return schema

    async def get_info(self, symbol: str) -> CompanyMetaSchema:
        symbol = symbol.upper()
        schema = CompanyMetaSchema()

        company_info = await self._client.company(symbol)

        schema.employees = company_info.get('employees')
        schema.summary = company_info.get('description')
        schema.short_name = f'{company_info.get("exchange", "")} {symbol}'.strip()

        return schema

    async def get_ceo(self, symbol, year: int) -> CEOSchema | None:
        warn('This method is deprecated', DeprecationWarning)

        symbol = symbol.upper()
        context = self._request_context(symbol=symbol, year=year)

        ceo_data = await self._client.time_series(id='CEO_COMPENSATION', **context)

        if ceo_data:
            full_name = ceo_data[0].get('name')
            return CEOSchema(full_name=full_name, start_year=year)

    @staticmethod
    def _request_context(symbol: str, year: int, quarter: int = None) -> dict:
        subattribute = {'fiscalYear': str(year)}
        if quarter:
            subattribute['fiscalQuarter'] = str(quarter)
        return {'symbol': symbol, 'subattribute': ','.join(f'{k}|{v}' for k, v in subattribute.items())}
