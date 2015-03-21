from __future__ import annotations

from threading import Lock
from abc import ABC, abstractmethod
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from companies.schemas import CompanyMetaSchema, FinancialSchema, ValuationEarningsSchema, PriceSchema, CEOSchema


class FinancialAPI(ABC, object):
    _client: any
    __instances: dict = {}
    __lock: Lock = Lock()

    def __new__(cls, *args, **kwargs):
        with cls.__lock:
            if cls not in cls.__instances:
                cls.__instances[cls] = super(FinancialAPI, cls).__new__(cls)
        return cls.__instances[cls]

    @abstractmethod
    async def get_financials(self, symbol: str, year: int, quarter: int = None) -> 'FinancialSchema' | None:
        """
        Receives financial data for the transferred period

        :param symbol: Company symbol
        :param year: Fiscal year
        :param quarter: Fiscal quarter (not required)
        :return: Financial schema
        """
        raise NotImplementedError

    @abstractmethod
    async def get_historical_prices(self, symbol: str, year: int, quarter: int = None) -> list['PriceSchema']:
        """
        Gets historical prices for the selected period

        :param symbol: Company symbol
        :param year: Fiscal year
        :param quarter: Fiscal quarter (not required)
        :return: List of historical prices
        """
        raise NotImplementedError

    @abstractmethod
    async def get_last_prices(self, symbol: str) -> list['PriceSchema']:
        """
        Returns prices for the last 5 days

        :param symbol: Company symbol
        :return: List of historical prices
        """
        raise NotImplementedError

    @abstractmethod
    async def get_stock_price(self, symbol: str) -> tuple[float, float, float, float]:
        """
        Gets the current stock price and change for the day

        :param symbol: Company symbol
        :return: Share price, percentage change
        """
        raise NotImplementedError

    @abstractmethod
    async def get_market_cap(self, symbol: str) -> float:
        """
        Gets the current market capitalization

        :param symbol: Company symbol
        :return: Market cap float
        """
        raise NotImplementedError

    @abstractmethod
    async def get_stats(self, symbol: str) -> 'ValuationEarningsSchema':
        """
        Gets company statistics

        :param symbol: Company symbol
        :return: Valuation & Earnings schema
        """
        raise NotImplementedError

    @abstractmethod
    async def get_info(self, symbol: str) -> 'CompanyMetaSchema':
        """
        Gets information about the company (description, etc.)

        :param symbol: Company symbol
        :return: Company metadata
        """
        raise NotImplementedError

    @abstractmethod
    async def get_ceo(self, symbol: str, year: int) -> 'CEOSchema':
        """
        Gets information about the CEO of the company

        :param symbol: Company symbol
        :param year: Fiscal year
        :return: CEO schema
        """
