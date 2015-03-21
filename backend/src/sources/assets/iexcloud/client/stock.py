from .base import IEXCloudBase

from ..methods import TimeSeries, Quote, Company, HistoricalPrices


class IEXCloudStock(IEXCloudBase):
    async def time_series(self, id: str, symbol: str, subkey: str = None, **kwargs):
        """
        Time series is the most common type of data available, and consists of a collection of data
        points over a period of time

        :param id: ID used to identify a time series dataset.
        :param symbol: Key used to identify data within a dataset. A common example is a symbol such as `AAPL`
        :param subkey: The optional subkey can used to further refine data for a particular key if available
        :param kwargs: Query parameters
        :return:
        """

        call = TimeSeries(id=id, symbol=symbol, subkey=subkey, **kwargs)

        return await self(call)

    async def quote(self, symbol: str, **kwargs):
        """
        Real-time stock prices

        :param symbol: Company symbol
        :param kwargs:
        :return:
        """

        call = Quote(symbol=symbol)

        return await self(call)

    async def company(self, symbol: str, **kwargs):
        """
        Base company info

        :param symbol: Company symbol
        :param kwargs:
        :return:
        """

        call = Company(symbol=symbol)

        return await self(call)

    async def historical_prices(self, symbol: str, range: str):
        """
        Return historical prices data

        :param symbol: Company symbol
        :param range: Date range
        :return:
        """

        call = HistoricalPrices(symbol=symbol, range=range)

        return await self(call)
