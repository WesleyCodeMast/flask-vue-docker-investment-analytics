from .base import IEXMethod


class Quote(IEXMethod[dict]):
    __endpoint__ = 'stock/{symbol}/quote'

    def __init__(self, symbol: str, **query) -> None:
        self.symbol = symbol

    @property
    def endpoint(self):
        return self.__endpoint__.format(symbol=self.symbol)
