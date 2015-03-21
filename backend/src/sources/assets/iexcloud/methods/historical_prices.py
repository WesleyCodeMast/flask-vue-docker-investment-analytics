from .base import IEXMethod


class HistoricalPrices(IEXMethod[dict]):
    __endpoint__ = 'stock/{symbol}/chart/{range}'

    def __init__(self, symbol: str, range: str) -> None:
        self.symbol = symbol
        self.range = range

    @property
    def endpoint(self):
        return self.__endpoint__.format(symbol=self.symbol, range=self.range)
